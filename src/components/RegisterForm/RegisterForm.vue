<template>
  <div>
    <form>
      <div class="form-name">
        <label for="name">Your full name</label>
        <input
          type="text"
          id="name"
          placeholder="Full name..."
          name="name"
          v-model="name"
        />
      </div>
      <div class="form-username">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username..."
          name="username"
          v-model="username"
        />
      </div>
      <div class="form-email">
        <label for="email">E-mail</label>
        <input
          type="email"
          id="email"
          placeholder="E-mail..."
          name="email"
          v-model="email"
        />
      </div>
      <div class="form-password">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password..."
          name="password"
          v-model="password"
        />
      </div>
      <div class="form-confirm_password">
        <label for="confirm_password">Password</label>
        <input
          type="password"
          id="confirm_password"
          placeholder="Confirm Password..."
          name="confirm_password"
          v-model="confirm_password"
        />
      </div>
      <button
        @click.prevent="
          registerThisUser({
            name: name,
            username: username,
            email: email,
            password: password,
            confirm_password: confirm_password,
          })
        "
      >
        Register
      </button>
    </form>
  </div>
</template>
<script>
import { mapFields } from 'vuex-map-fields';
import { mapActions } from 'vuex';
export default {
  name: 'RegisterForm',
  computed: {
    ...mapFields([
      'registerForm.name',
      'registerForm.username',
      'registerForm.confirm_password',
      'registerForm.email',
      'registerForm.password',
    ]),
  },
  methods: {
    ...mapActions(['registerThisUser']),
  },
};
</script>
