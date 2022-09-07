<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import ErrorAlert from "@/components/alerts/ErrorAlert.vue";
import { useAuthStore } from "@/stores/auth.store";

const router = useRouter();

const authStore = useAuthStore();

let email = ref("");
let password = ref("");
let isDisabled = ref(false);

let isSuccessful = false;
let message = ref("");

async function handleSubmit() {
  isDisabled.value = true;
  isSuccessful = false;
  message.value = "";

  const [error] = await authStore.login({
    email: email.value,
    password: password.value,
  });

  if (error) {
    isDisabled.value = false;
    isSuccessful = false;

    message.value = error?.response?.data?.message || error?.message;
    return;
  }

  isSuccessful = true;
  router.push({ name: "todos" });
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
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            class="w-full"
            alt="Phone image"
          />
        </div>
        <div class="md:w-8/12 lg:w-5/12 lg:ml-20">
          <h2
            class="flex justify-center mb-4 text-4xl text-slate-800 uppercase"
          >
            Sign In
          </h2>
          <form @submit.prevent="handleSubmit" class="mb-4">
            <ErrorAlert v-if="!isSuccessful && message.length > 0">{{
              message
            }}</ErrorAlert>
            <fieldset :disabled="isDisabled">
              <div class="mb-6">
                <label
                  for="login-email-address"
                  class="form-label inline-block mb-2 text-gray-700"
                  >Email Address</label
                >
                <input
                  id="login-email-address"
                  type="email"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Email Address"
                  v-model="email"
                  required
                />
              </div>

              <div class="mb-6">
                <label
                  for="login-password"
                  class="form-label inline-block mb-2 text-gray-700"
                  >Password</label
                >
                <input
                  id="login-password"
                  type="password"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Password"
                  v-model="password"
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
                  <span> Signing in... </span>
                </span>
                <span v-if="!isDisabled"> Sign in </span>
              </button>
            </fieldset>
          </form>
          <hr class="mb-6 border-t" />
          <div
            class="flex justify-between items-center mb-6 flex-col lg:flex-row"
          >
            <router-link
              to="/auth/register"
              class="text-sm text-blue-400 hover:text-blue-800 file:duration-200 transition ease-in-out"
              >No account yet? Register here</router-link
            >
            <a
              href="#!"
              class="text-sm text-blue-400 hover:text-blue-800 file:duration-200 transition ease-in-out"
              >Forgot password?</a
            >
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
