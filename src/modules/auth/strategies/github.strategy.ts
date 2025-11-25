import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-github2";
import { ConfigService } from "@nestjs/config";

import { AppConfig } from "@/config/app.config";
import { AuthService } from "../auth.service";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, "github") {
  constructor(
    readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_CALLBACK_URL } = configService.get<AppConfig>("env")!;

    super({
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: GITHUB_CALLBACK_URL,
      scope: ["user:email"],
    });
  }

  async validate(
    _at: string,
    _rt: string,
    profile: {
      displayName: string;
      emails: { value: string }[];
      photos: { value: string }[];
    },
    done: Function,
  ) {
    const { displayName, emails, photos } = profile;
    const user = await this.authService.validateOAuthUser("GITHUB", {
      email: emails[0].value,
      fullname: displayName,
      avatarUrl: photos[0].value,
    });

    done(null, user);
  }
}
