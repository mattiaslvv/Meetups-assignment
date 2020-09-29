<template>
  <v-container class="register-form">
    <v-card class="mx-auto" max-width="500">
      <v-toolbar class="gradient" dark flat>
        <v-toolbar-title class="font-weight-bold">Register</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <form>
        <v-card-title class="title font-weight-regular justify-space-between">
          <span>{{ currentTitle }}</span>
          <v-avatar
            color="orange"
            class="subheading white--text"
            size="24"
            v-text="step"
          ></v-avatar>
        </v-card-title>
        <v-window v-model="step" id="registerWindow">
          <v-window-item :value="1">
            <v-card-text>
              <v-text-field
                label="Name"
                id="name"
                color="orange"
                prepend-icon="mdi-account-box-outline"
                placeholder="Full name"
                autocomplete="name"
                v-model="name"
                required
                :error-messages="nameErrors"
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field>
              <span class="caption grey--text text--darken-1">
                Your full name
              </span>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="2">
            <v-card-text>
              <v-text-field
                label="Password"
                v-model="password"
                color="orange"
                id="password"
                autocomplete="new-password"
                prepend-icon="mdi-lock-question"
                type="password"
                :error-messages="passwordErrors"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
                required
              ></v-text-field>
              <v-text-field
                label="Confirm Password"
                v-model="confirm_password"
                color="orange"
                id="confirm_password"
                autocomplete="new-password"
                prepend-icon="mdi-lock-reset"
                type="password"
                :error-messages="confirm_passwordErrors"
                @input="$v.confirm_password.$touch()"
                @blur="$v.confirm_password.$touch()"
                required
              ></v-text-field>
              <span class="caption grey--text text--darken-1">
                Please enter a password for your account
              </span>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="3">
            <v-card-text>
              <v-text-field
                label="Email"
                v-model="email"
                id="email"
                autocomplete="email"
                color="orange"
                type="email"
                prepend-icon="mdi-at"
                :error-messages="emailErrors"
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
                required
                placeholer="CoolSite@Placeholder.com"
              ></v-text-field>
              <span class="caption grey--text text--darken-1">
                Fill in your e-mail
              </span>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="4">
            <v-card-text>
              <v-text-field
                label="Username"
                v-model="username"
                prepend-icon="mdi-account"
                color="orange"
                id="username"
                autocomplete="username"
                :error-messages="usernameErrors"
                @input="$v.username.$touch()"
                @blur="$v.username.$touch()"
                placeholer="codeMasterxXx"
                required
              ></v-text-field>
              <span class="caption grey--text text--darken-1">
                Fill in a cool username
              </span>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="5">
            <div class="pa-4 text-center">
              <v-img
                class="mb-4"
                contain
                height="128"
                color="orange"
                src="https://cdn.vuetifyjs.com/images/logos/v.svg"
              ></v-img>
              <h3 class="title font-weight-light mb-2">
                Welcome to Matrix Meetups!
              </h3>
              <span class="caption grey--text">Thanks for signing up!</span>
            </div>
          </v-window-item>
        </v-window>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn :disabled="step === 1" text @click="step--"> Back </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            :disabled="step === 4"
            v-if="step <= 4"
            color="orange"
            dark
            id="next"
            depressed
            @click="step++"
            class="font-weight-bold"
          >
            Next
          </v-btn>
          <v-btn
            v-if="step === 4"
            color="orange"
            dark
            id="register"
            depressed
            @click="submit"
            class="font-weight-bold"
          >
            Register!
          </v-btn>
          <v-btn
            to="/Login"
            dark
            depressed
            color="orange"
            v-if="step === 5"
            class="font-weight-bold"
            @click="toLogin"
          >
            Login
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
    <div class="text-center ma-2">
      <v-snackbar
        content-class="font-weight-bold"
        color="red"
        id="submitStatus"
        :centered="centered"
        v-model="snackbar"
      >
        <v-icon>mdi-alert</v-icon>
        {{ submitStatus }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            text
            class="font-weight-bold"
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </v-container>
</template>
<script>
import { mapFields } from 'vuex-map-fields';
import { mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
export default {
  name: 'RegisterForm',
  mixins: [validationMixin],
  validations: {
    name: { required },
    password: { required },
    confirm_password: { required },
    email: { required },
    username: { required },
  },
  data() {
    return {
      step: 1,
      submitStatus: '',
      snackbar: false,
      centered: true,
    };
  },
  computed: {
    ...mapFields([
      'registerForm.name',
      'registerForm.username',
      'registerForm.confirm_password',
      'registerForm.email',
      'registerForm.password',
    ]),
    currentTitle() {
      switch (this.step) {
        case 1:
          return 'Sign-up';
        case 2:
          return 'Create a password';
        case 3:
          return 'Enter your E-mail';
        case 4:
          return 'Enter your username';
        default:
          return 'Account created';
      }
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push('Must fill in your name');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push('Must fill in a password');
      return errors;
    },
    confirm_passwordErrors() {
      const errors = [];
      if (!this.$v.confirm_password.$dirty) return errors;
      !this.$v.confirm_password.required &&
        errors.push('Must fill in a matching password');
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push('E-mail is required');
      return errors;
    },
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push('Must fill in a username');
      return errors;
    },
  },
  methods: {
    ...mapActions(['registerThisUser']),
    toLogin() {
      this.$router.push('/Login');
    },
    submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = 'Must fill in all fields';
        this.snackbar = true;
      } else {
        // do your submit logic here
        this.registerThisUser();
        this.submitStatus = 'Pending';
        this.$data.step++;
        setTimeout(() => {
          this.submitStatus = 'OK';
        }, 500);
      }
    },
  },
};
</script>
<style scoped>
.register-form {
  margin: 0 auto;
  margin-top: 6%;
}
</style>
