<script setup>
import { ref } from "vue";
import ErrorAlert from "@/components/alerts/ErrorAlert.vue";
import SuccessAlert from "@/components/alerts/SuccessAlert.vue";
import { useAuthStore } from "@/stores/auth.store";
import LoginLink from "@/components/links/auth/LoginLink.vue";
import RegistrationLink from "@/components/links/auth/RegistrationLink.vue";
import TextfieldForm from "@/components/forms/TextfieldForm.vue";
import ForgotPasswordLink from "@/components/links/auth/ForgotPasswordLink.vue";

const authStore = useAuthStore();

let email = ref("");
let isDisabled = ref(false);

let isSuccessful = ref(false);
let message = ref("");

async function handleSubmit() {
  isSuccessful.value = false;
  isDisabled.value = true;
  message.value = "";

  const [error, success] = await authStore.resendEmailVerification({
    email: email.value,
  });

  if (error) {
    message.value = error?.response?.data?.message || error?.message;
  }

  if (success) {
    isSuccessful.value = true;
    message.value = success.data.message;
    email.value = "";
  }

  isDisabled.value = false;
}
</script>
<template>
  <div
    class="flex items-center justify-center w-screen h-screen xs:h-full bg-gradient-to-r from-purple-700 to-purple-300"
  >
    <div class="container">
      <div class="flex justify-center px-6 my-12">
        <div class="w-full xl:w-3/4 lg:w-11/12 flex">
          <div
            class="relative w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
            :style="{
              backgroundImage:
                'url(' +
                require('@//assets/images/glenn-carstens-peters-npxXWgQ33ZQ-unsplash.jpg') +
                ')',
            }"
          >
            <div class="text-white absolute bottom-2 left-2">
              Photo by
              <a
                target="_blank"
                href="https://unsplash.com/@glenncarstenspeters?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              >
                Glenn Carstens-Peters
              </a>
              on
              <a
                target="_blank"
                href="https://unsplash.com/s/photos/email?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
              >
                Unsplash
              </a>
            </div>
          </div>
          <div
            class="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none"
          >
            <div class="px-8 mb-4 text-center">
              <h3 class="pt-4 mb-2 text-2xl">Verify Your Account?</h3>
              <p class="mb-4 text-sm text-gray-700">
                Just enter your email address below and we'll send you a link to
                verify your account!
              </p>
            </div>
            <form
              @submit.prevent="handleSubmit"
              class="px-8 pt-6 bg-white rounded"
            >
              <ErrorAlert v-if="!isSuccessful && message.length > 0">{{
                message
              }}</ErrorAlert>
              <SuccessAlert v-if="isSuccessful && message.length > 0">{{
                message
              }}</SuccessAlert>
              <fieldset :disabled="isDisabled">
                <div class="mb-4">
                  <TextfieldForm
                    id="email"
                    type="email"
                    label="Email Address"
                    v-model="email"
                    required
                  />
                </div>
                <div class="mb-6 text-center">
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
                      <span> Sending Verification Email... </span>
                    </span>
                    <span v-if="!isDisabled">Verify Account</span>
                  </button>
                </div>
              </fieldset>
            </form>
            <hr class="mb-6 border-t" />
            <div class="flex flex-col items-left mb-6">
              <LoginLink />
              <RegistrationLink />
              <ForgotPasswordLink />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
