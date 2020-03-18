import { NgModule } from "@angular/core";
import { RouterModule, Routes, NoPreloading } from "@angular/router";
import { AuthGuard } from "./services/user/auth.guard";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./pages/marketing/marketing-routing.module").then(
        m => m.MarketingRoutingModule
      )
  },
  {
    path: "login",
    loadChildren: () =>
      import("./pages/auth/login/login.module").then(m => m.LoginPageModule)
  },
  {
    path: "reset-password",
    loadChildren: () =>
      import("./pages/auth/reset-password/reset-password.module").then(
        m => m.ResetPasswordPageModule
      )
  },
  {
    path: "signup",
    loadChildren: () =>
      import("./pages/auth/signup/signup.module").then(m => m.SignupPageModule)
  },
  {
    path: "main",
    loadChildren: () =>
      import("./pages/main/main.module").then(m => m.MainPageModule) //,
  },
  {
    path: "group/view/:id",
    loadChildren: () =>
      import("./pages/group/group-view/group-view.module").then(
        m => m.GroupViewPageModule
      ),
    canActivate: [AuthGuard]
  },
  {
    path: "product/view/grp-id/:groupId/pdct-id/:productId",
    loadChildren: () =>
      import("./pages/product/product-view/product-view.module").then(
        m => m.ProductViewPageModule
      ),
    canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // preloadingStrategy: PreloadAllModules,
      preloadingStrategy: NoPreloading,
      onSameUrlNavigation: "reload"
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
