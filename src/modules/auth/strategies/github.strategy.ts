import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { Strategy } from "passport-github2";

import { AppConfig } from "@/config/app.config";
import { AuthService } from "../auth.service";

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, "github") {
  constructor(
    readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    const { GITHUB_OAUTH_CLIENT_ID, GITHUB_OAUTH_CLIENT_SECRET, GITHUB_OAUTH_CALLBACK_URL } =
      configService.get<AppConfig>("env")!;

    super({
      clientID: GITHUB_OAUTH_CLIENT_ID,
      clientSecret: GITHUB_OAUTH_CLIENT_SECRET,
      callbackURL: GITHUB_OAUTH_CALLBACK_URL,
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
    done: (Err: Error | null, user: any) => void,
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
