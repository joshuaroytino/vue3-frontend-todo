<script setup>
import { useAuthStore } from "@/stores/auth.store";
import { ref } from "vue";
import ErrorAlert from "@/components/alerts/ErrorAlert.vue";
import SuccessAlert from "@/components/alerts/SuccessAlert.vue";
import AuthLinks from "@/components/links/AuthLinks.vue";

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
                <label
                  for="register-name"
                  class="form-label inline-block mb-2 text-gray-700"
                  >Name</label
                >
                <input
                  id="register-name"
                  type="text"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Name"
                  v-model="name"
                  required
                />
              </div>

              <div class="mb-6">
                <label
                  for="register-email-address"
                  class="form-label inline-block mb-2 text-gray-700"
                  >Email Address</label
                >
                <input
                  id="register-email-address"
                  type="email"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Email Address"
                  v-model="email"
                  required
                />
              </div>

              <div class="mb-6">
                <label
                  for="register-password"
                  class="form-label inline-block mb-2 text-gray-700"
                  >Password</label
                >
                <input
                  id="register-password"
                  type="password"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Password"
                  v-model="password"
                  required
                />
              </div>

              <div class="mb-6">
                <label
                  for="register-confirm-password"
                  class="form-label inline-block mb-2 text-gray-700"
                  >Confirm Password</label
                >
                <input
                  id="register-confirm-password"
                  type="password"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Confirm Password"
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
          <div
            class="flex justify-between items-center mb-6 flex-col lg:flex-row"
          >
            <AuthLinks to="/login">
              Already have an account? Login here
            </AuthLinks>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
