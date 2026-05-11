import { AuthGuard } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

@Injectable()
export class GoogleAuthGuard extends AuthGuard("google") {}

@Injectable()
export class GithubAuthGuard extends AuthGuard("github") {}
