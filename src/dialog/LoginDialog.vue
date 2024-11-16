<template>
  <BaseDialog id="login-dialog"
              title="Login" width="800" height="500" min-height="500"
              @close="loginDialog.close()">
    <template v-slot:content>
      <character-slider/>

      <login-form v-if="loginDialog.isLoginForm()"
                  @to-register="loginDialog.changeFormToRegister($event)"
                  @to-verify="loginDialog.changeFormToVerify()"
                  @to-reset-password="loginDialog.changeFormToResetPassword()"
                  @close="loginDialog.close()"
                  :google-user="loginDialog.googleUser"/>

      <register-form v-else-if="loginDialog.isRegisterForm()"
                     @to-login="loginDialog.changeFormToLogin()"
                     @to-verify="loginDialog.changeFormToVerify()"
                     @to-reset-password="loginDialog.changeFormToResetPassword()"
                     @close="loginDialog.close()"
                     :google-user-props="loginDialog.googleUser"/>

      <verify-form v-else-if="loginDialog.isVerifyForm()"
                   @close="loginDialog.close()"/>

      <reset-password-form v-else-if="loginDialog.isResetPasswordForm()"
                           @close="loginDialog.close()"/>
    </template>
  </BaseDialog>
</template>
<script>
import BaseDialog from "@/dialog/BaseDialog.vue";
import LoginForm from "@/components/LoginForm.vue";
import CharacterSlider from "@/components/CharacterSlider.vue";
import RegisterForm from "@/components/RegisterForm.vue";
import VerifyForm from "@/components/VerifyForm.vue";
import {useDialogStore} from "@/stores/dialog.js";
import ResetPasswordForm from "@/components/ResetPasswordForm.vue";

export default {
  components: {ResetPasswordForm, VerifyForm, RegisterForm, CharacterSlider, LoginForm, BaseDialog},
  props: {
    currentForm: {type: Number, required: true}
  },
  data() {
    return {
      loginDialog: useDialogStore().getLoginDialog
    }
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss">
  #login-dialog {
    //backdrop-filter: blur(3px);
    .header, .footer {
      display: none;
    }
    .content {
      display: flex;
      gap: 20px;

      #login-form, #register-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
  }

  @media (max-width: 930px) {
    #login-dialog {
      .content {
        #character-slider {
          display: none;
        }
      }
    }
  }
</style>