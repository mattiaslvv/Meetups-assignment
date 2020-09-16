<template>
  <div>
    <form>
      <div class="form-name">
        <label for="name">Your full name</label>
        <input type="text" id="name" placeholder="Full name..." name="name" />
      </div>
      <div class="form-username">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username..."
          name="username"
        />
      </div>
      <div class="form-email">
        <label for="email">E-mail</label>
        <input type="email" id="email" placeholder="E-mail..." name="email" />
      </div>
      <div class="form-password">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password..."
          name="password"
        />
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</template>
<script>
export default {
  name: 'RegisterForm',
};
</script>
