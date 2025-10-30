import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { Strategy } from "passport-google-oauth20";
import { ConfigService } from "@nestjs/config";

import { AppConfig } from "@/config/app.config";
import { AuthService } from "../auth.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = configService.get<AppConfig>("env")!;

    super({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
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
    done: Function,
  ): Promise<any> {
    const { displayName, emails, photos } = profile;
    const user = await this.authService.validateOAuthUser("google", {
      email: emails[0].value,
      fullname: displayName,
      avatarUrl: photos[0].value,
    });

    done(null, user);
  }
}
