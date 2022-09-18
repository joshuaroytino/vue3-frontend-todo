<script setup>
import { useAuthStore } from "@/stores/auth.store";
import { ref } from "vue";
import ErrorAlert from "@/components/alerts/ErrorAlert.vue";
import SuccessAlert from "@/components/alerts/SuccessAlert.vue";
import TextfieldForm from "@/components/forms/TextfieldForm.vue";
import LoginLink from "@/components/links/auth/LoginLink.vue";
import EmailVerificationLink from "@/components/links/auth/EmailVerificationLink.vue";
import ForgotPasswordLink from "@/components/links/auth/ForgotPasswordLink.vue";

const authStore = useAuthStore();

let name = ref("");
let email = ref("");
let password = ref("");
let confirm_password = ref("");
let isDisabled = ref(false);

let message = ref("");
let isSuccessful = ref(false);

async function handleSubmit() {
  isSuccessful.value = false;
  isDisabled.value = true;
  message.value = "";

  const [error, success] = await authStore.register({
    email: email.value,
    name: name.value,
    password: password.value,
    confirm_password: confirm_password.value,
  });

  if (error) {
    isDisabled.value = false;
    message.value = error?.response?.data?.message || error?.message;

    return;
  }

  isSuccessful.value = true;
  message.value = success?.data?.message;
  reset();
}

function reset() {
  name.value = "";
  email.value = "";
  password.value = "";
  confirm_password.value = "";
  isDisabled.value = false;
}
</script>
<template>
  <section class="h-screen">
    <div class="container px-6 py-12 h-full mx-auto">
      <div
        class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800"
      >
        <div class="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="w-full"
            alt="Phone image"
          />
        </div>
        <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
          <h2
            class="flex justify-center mb-4 text-4xl text-slate-800 uppercase"
          >
            Create an Account
          </h2>
          <form @submit.prevent="handleSubmit">
            <ErrorAlert
              v-if="!isSuccessful && message.length > 0"
              class="mb-2"
              >{{ message }}</ErrorAlert
            >
            <SuccessAlert v-if="isSuccessful && message.length > 0">{{
              message
            }}</SuccessAlert>
            <fieldset :disabled="isDisabled">
              <div class="mb-6">
                <TextfieldForm
                  label="Name"
                  id="register-name"
                  v-model="name"
                  required="true"
                />
              </div>

              <div class="mb-6">
                <TextfieldForm
                  label="Email Address"
                  id="register-email-address"
                  type="email"
                  v-model="email"
                  required="true"
                />
              </div>

              <div class="mb-6">
                <TextfieldForm
                  id="register-password"
                  type="password"
                  label="Password"
                  v-model="password"
                  required
                />
              </div>

              <div class="mb-6">
                <TextfieldForm
                  id="register-confirm-password"
                  type="password"
                  label="Confirm Password"
                  v-model="confirm_password"
                  required
                />
              </div>

              <button
                type="submit"
                class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                :disabled="isDisabled"
              >
                <span class="flex justify-center gap-4" v-if="isDisabled">
                  <span
                    class="spinner-border animate-spin inline-block w-4 h-4 border-4 rounded-full"
                    role="status"
                  ></span>
                  <span> Signing Up... </span>
                </span>
                <span v-if="!isDisabled"> Sign Up </span>
              </button>
            </fieldset>
          </form>
          <hr class="mt-4 mb-6 border-t" />
          <div class="flex flex-col items-left mb-6">
            <LoginLink />
            <EmailVerificationLink />
            <ForgotPasswordLink />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
