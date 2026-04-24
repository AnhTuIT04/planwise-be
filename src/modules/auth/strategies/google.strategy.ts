import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";
import { Strategy } from "passport-google-oauth20";

import { AppConfig } from "@/config/app.config";
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    const { GOOGLE_OAUTH_CLIENT_ID, GOOGLE_OAUTH_CLIENT_SECRET, GOOGLE_OAUTH_CALLBACK_URL } =
      configService.get<AppConfig>("env")!;

    super({
      clientID: GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: GOOGLE_OAUTH_CALLBACK_URL,
      scope: ["email", "profile"],
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
  ): Promise<any> {
    const { displayName, emails, photos } = profile;
    const user = await this.authService.validateOAuthUser("GOOGLE", {
      email: emails[0].value,
      fullname: displayName,
      avatarUrl: photos[0].value,
    });

    done(null, user);
  }
}
