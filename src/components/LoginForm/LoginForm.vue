<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12">
          <v-toolbar class="gradient" dark flat>
            <v-toolbar-title class="font-weight-bold">Login</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                id="username"
                :error-messages="usernameErrors"
                placeholder="Username"
                autocomplete="username"
                name="username"
                v-model="username"
                label="Username"
                prepend-icon="mdi-account"
                type="text"
                required
                color="orange"
                @input="$v.username.$touch()"
                @blur="$v.username.$touch()"
              ></v-text-field>
              <v-text-field
                :error-messages="passwordErrors"
                label="Password"
                prepend-icon="mdi-lock"
                type="password"
                id="password"
                placeholder="Password..."
                autocomplete="current-password"
                name="password"
                v-model="password"
                required
                color="orange"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="orange"
              id="loginBtn"
              class="font-weight-bold"
              dark
              @click="submit"
              >Login</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions } from 'vuex';
import { mapFields } from 'vuex-map-fields';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
export default {
  name: 'LoginForm',
  mixins: [validationMixin],
  validations: {
    password: { required },
    username: { required },
  },
  computed: {
    ...mapFields(['loginForm.username', 'loginForm.password']),
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push('Username is required');
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push('Password is required');
      return errors;
    },
  },
  methods: {
    ...mapActions(['loginThisUser']),
    async submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
      } else {
        // do your submit logic here
        await this.$store.dispatch('loginThisUser');
      }
    },
  },
};
</script>
