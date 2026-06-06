import { Injectable, NotFoundException } from "@nestjs/common";

import { Prisma } from "prisma/client/pg";
import { PgService } from "~/database/pg.service";
import { MessageOnlyResponse } from "@/common/dto/message.dto";
import { AdminUserStatusFilter, ListUsersQueryDto } from "./dto/request/list-users-query.dto";
import { ListProjectsQueryDto } from "./dto/request/list-projects-query.dto";
import { AdminUsersOffsetResponse, AdminUserDetailResponse } from "./dto/response/admin-user-response.dto";
import { AdminProjectsOffsetResponse, AdminProjectDetailResponse } from "./dto/response/admin-project-response.dto";
import { AdminStatsResponse } from "./dto/response/admin-stats-response.dto";

const DAILY_STATS_DAYS = 30;
const RECENT_ITEMS_LIMIT = 5;

@Injectable()
export class AdminService {
  constructor(private readonly pgService: PgService) {}

  // -------------------------------
  // DASHBOARD STATS
  // -------------------------------

  async getStats() {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = new Date(startOfToday.getTime() - (DAILY_STATS_DAYS - 1) * 24 * 60 * 60 * 1000);

    const [
      users,
      verifiedUsers,
      disabledUsers,
      projects,
      personalProjects,
      newUsersThisWeek,
      newUsersLastWeek,
      newProjectsThisWeek,
      newProjectsLastWeek,
      recentUserDates,
      recentProjectDates,
      recentUsers,
      recentProjects,
    ] = await Promise.all([
      this.pgService.user.count(),
      this.pgService.user.count({ where: { verified: true } }),
      this.pgService.user.count({ where: { disabledAt: { not: null } } }),
      this.pgService.project.count(),
      this.pgService.project.count({ where: { isPersonal: true } }),
      this.pgService.user.count({ where: { createdAt: { gte: oneWeekAgo } } }),
      this.pgService.user.count({ where: { createdAt: { gte: twoWeeksAgo, lt: oneWeekAgo } } }),
      this.pgService.project.count({ where: { createdAt: { gte: oneWeekAgo } } }),
      this.pgService.project.count({ where: { createdAt: { gte: twoWeeksAgo, lt: oneWeekAgo } } }),
      this.pgService.user.findMany({
        where: { createdAt: { gte: thirtyDaysAgo } },
        select: { createdAt: true },
      }),
      this.pgService.project.findMany({
        where: { createdAt: { gte: thirtyDaysAgo } },
        select: { createdAt: true },
      }),
      this.pgService.user.findMany({
        orderBy: { createdAt: "desc" },
        take: RECENT_ITEMS_LIMIT,
        select: { id: true, email: true, fullname: true, avatarUrl: true, createdAt: true },
      }),
      this.pgService.project.findMany({
        orderBy: { createdAt: "desc" },
        take: RECENT_ITEMS_LIMIT,
        select: {
          id: true,
          name: true,
          logoUrl: true,
          isPersonal: true,
          createdAt: true,
          owner: { select: { fullname: true } },
        },
      }),
    ]);

    // Bucket signups / project creations by day for the last 30 days
    const daily = Array.from({ length: DAILY_STATS_DAYS }, (_, index) => {
      const day = new Date(thirtyDaysAgo.getTime() + index * 24 * 60 * 60 * 1000);
      return { date: this.toDateKey(day), users: 0, projects: 0 };
    });
    const dailyByDate = new Map(daily.map((point) => [point.date, point]));

    for (const { createdAt } of recentUserDates) {
      const point = dailyByDate.get(this.toDateKey(createdAt));
      if (point) point.users += 1;
    }
    for (const { createdAt } of recentProjectDates) {
      const point = dailyByDate.get(this.toDateKey(createdAt));
      if (point) point.projects += 1;
    }

    return new AdminStatsResponse(
      {
        totals: {
          users,
          verifiedUsers,
          disabledUsers,
          projects,
          personalProjects,
          teamProjects: projects - personalProjects,
        },
        growth: { newUsersThisWeek, newUsersLastWeek, newProjectsThisWeek, newProjectsLastWeek },
        daily,
        recentUsers,
        recentProjects,
      },
      "Statistics retrieved successfully.",
    );
  }

  private toDateKey(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // -------------------------------
  // USER MANAGEMENT
  // -------------------------------

  async listUsers(query: ListUsersQueryDto) {
    const { page, limit, q, status } = query;

    const where: Prisma.UserWhereInput = {};
    if (q) {
      where.OR = [
        { email: { contains: q, mode: "insensitive" } },
        { fullname: { contains: q, mode: "insensitive" } },
      ];
    }
    if (status === AdminUserStatusFilter.ACTIVE) where.disabledAt = null;
    if (status === AdminUserStatusFilter.DISABLED) where.disabledAt = { not: null };

    const [users, totalItems] = await Promise.all([
      this.pgService.user.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          email: true,
          fullname: true,
          avatarUrl: true,
          verified: true,
          disabledAt: true,
          createdAt: true,
          _count: { select: { ownedProjects: true, memberships: true } },
        },
      }),
      this.pgService.user.count({ where }),
    ]);

    return new AdminUsersOffsetResponse(users, page, limit, totalItems, "Users retrieved successfully.");
  }

  async getUserDetail(userId: string) {
    const user = await this.pgService.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullname: true,
        avatarUrl: true,
        verified: true,
        disabledAt: true,
        createdAt: true,
        updatedAt: true,
        _count: { select: { ownedProjects: true, memberships: true } },
        oauthAccounts: { select: { provider: true } },
        memberships: {
          select: {
            role: { select: { name: true } },
            project: { select: { id: true, name: true, logoUrl: true, isPersonal: true, ownerId: true } },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return new AdminUserDetailResponse(user, "User detail retrieved successfully.");
  }

  async disableUser(userId: string) {
    await this.ensureUserExists(userId);
    await this.pgService.user.update({ where: { id: userId }, data: { disabledAt: new Date() } });

    return new MessageOnlyResponse("User has been disabled.");
  }

  async enableUser(userId: string) {
    await this.ensureUserExists(userId);
    await this.pgService.user.update({ where: { id: userId }, data: { disabledAt: null } });

    return new MessageOnlyResponse("User has been enabled.");
  }

  private async ensureUserExists(userId: string) {
    const user = await this.pgService.user.findUnique({ where: { id: userId }, select: { id: true } });
    if (!user) {
      throw new NotFoundException("User not found");
    }
  }

  // -------------------------------
  // PROJECT MANAGEMENT (READ-ONLY)
  // -------------------------------

  async listProjects(query: ListProjectsQueryDto) {
    const { page, limit, q } = query;

    const where: Prisma.ProjectWhereInput = q ? { name: { contains: q, mode: "insensitive" } } : {};

    const [projects, totalItems] = await Promise.all([
      this.pgService.project.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          name: true,
          logoUrl: true,
          description: true,
          isPersonal: true,
          createdAt: true,
          owner: { select: { id: true, email: true, fullname: true, avatarUrl: true } },
          _count: { select: { members: true, sections: true, tasks: true } },
        },
      }),
      this.pgService.project.count({ where }),
    ]);

    return new AdminProjectsOffsetResponse(projects, page, limit, totalItems, "Projects retrieved successfully.");
  }

  /**
   * General info only — exposes project metadata and the member list,
   * never the project's tasks/sections content.
   */
  async getProjectDetail(projectId: string) {
    const project = await this.pgService.project.findUnique({
      where: { id: projectId },
      select: {
        id: true,
        name: true,
        logoUrl: true,
        description: true,
        isPersonal: true,
        createdAt: true,
        owner: { select: { id: true, email: true, fullname: true, avatarUrl: true } },
        _count: { select: { members: true, sections: true, tasks: true, channels: true } },
        members: {
          select: {
            user: { select: { id: true, email: true, fullname: true, avatarUrl: true, disabledAt: true } },
            role: { select: { name: true } },
          },
        },
      },
    });

    if (!project) {
      throw new NotFoundException("Project not found");
    }

    return new AdminProjectDetailResponse(project, "Project general information retrieved successfully.");
  }
}
