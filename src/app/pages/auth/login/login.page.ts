import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormBuilder,
  ReactiveFormsModule
} from "@angular/forms";
import { LoadingController, AlertController } from "@ionic/angular";
import { AuthService } from "../../../services/user/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  public loading: HTMLIonLoadingElement;
  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.email])],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(6)])
      ]
    });
  }

  async loginUser(loginForm: FormGroup): Promise<void> {
    if (!loginForm.valid) {
      console.log("Form is not valid yet, current value:", loginForm.value);
    } else {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();

      let email = loginForm.value.email;
      let password = loginForm.value.password;

      this.authService.loginUser(email, password).then(
        () => {
          this.loading.dismiss().then(() => {
            this.router.navigateByUrl("/main");
            this.loginForm.reset();
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            let errorMessage = "로그인 정보가 유효하지 않습니다.";
            switch (error.code) {
              case "auth/user-not-found":
                errorMessage =
                  "이 식별자에 해당하는 사용자 기록이 없다. 사용자가 삭제되었을 수 있다.";
                break;
              case "auth/wrong-password":
                errorMessage = "암호가 잘못되었거나 사용자에게 암호가 없다.";
                break;
              case "auth/email-not-verified":
                errorMessage = "이메일 인증이 완료되지 않았습니다.";
                break;
              default:
                break;
            }
            const alert = await this.alertCtrl.create({
              message: errorMessage,
              buttons: [{ text: "확인", role: "cancel" }]
            });
            await alert.present();
          });
        }
      );
    }
  }

  loginGmail() {
    this.authService.loginUserWithGmail().then(() => {
      this.router.navigateByUrl("");
    });
  }
  ngOnInit() {}
}
