<template>
  <div>
    <form>
      <div class="form-username">
        <label for="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Username..."
          name="username"
        />
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
      <button type="submit">Login</button>
    </form>
  </div>
</template>
<script>
export default {
  name: 'LoginForm',
};
</script>
