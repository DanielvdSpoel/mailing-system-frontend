<template>
  <AuthLayout>
    <template v-slot:title> Sign in to your account </template>

    <template v-slot:content>
      <form class="space-y-3" @submit.prevent="submit">
        <InputField
          name="email"
          label="Email address"
          type="email"
          v-model="form.email"
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          v-model="form.password"
        />

        <div>
          <button type="submit" class="btn btn-primary w-full">Sign in</button>
        </div>
      </form>
    </template>
  </AuthLayout>
</template>

<script>
import AuthLayout from "@/layouts/AuthLayout.vue";
import InputField from "@/components/fields/InputField.vue";
import { useUserStore } from "@/stores/user";
import { useNotificationStore } from "@/stores/notifications";

export default {
  name: "LoginView",
  components: { InputField, AuthLayout },
  data() {
    return {
      form: {
        email: null,
        password: null,
      },
      processing: false,
    };
  },
  methods: {
    submit() {
      this.processing = true;
      this.$http
        .post("/auth/login", this.form)
        .then(async (result) => {
          const userStore = useUserStore();
          await userStore.setToken(result.data.token);
          await userStore.fetchUser(this.$http);

          useNotificationStore().addNotification({
            message: "Login successful",
            type: "success",
            duration: 4000,
          });

          const redirectTo = this.$route.query.redirect
            ? this.$route.query.redirect
            : "/";
          await this.$router.push(redirectTo);
        })
        .catch(async function (error) {
          // handle error
          // if (error.response.status === 422) {
          //   if (error.response.data.errors.code) {
          //     that.showCodeInput = true;
          // const toast = await toastController.create({
          //   message: "Je moet je 2FA token invullen!",
          //   duration: 4000,
          //   color: 'danger',
          // });
          // await toast.present();
          //   }
          // }
          console.log(error);
        });
      this.processing = false;
    },
  },
};
</script>
