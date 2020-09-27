<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="12" md="8">
        <form class="createmeetup-form">
          <h2 class="font-weight-bold">Create a Meetup</h2>
          <v-text-field
            prepend-icon="mdi-calendar-text"
            v-model="eventName"
            color="orange"
            :error-messages="eventNameErrors"
            :counter="50"
            label="Meetup name"
            required
            id="eventName"
            @input="$v.eventName.$touch()"
            @blur="$v.eventName.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="details"
            prepend-icon="mdi-card-text-outline"
            :error-messages="detailsErrors"
            label="Details"
            color="orange"
            required
            id="details"
            @input="$v.details.$touch()"
            @blur="$v.details.$touch()"
          ></v-text-field>
          <v-text-field
            v-model="address"
            prepend-icon="mdi-map-marker"
            color="orange"
            :error-messages="addressErrors"
            label="Address"
            required
            id="address"
            @input="$v.address.$touch()"
            @blur="$v.address.$touch()"
          ></v-text-field>
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="date"
            transition="scale-transition"
            offset-y
            id="menu"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Pick a date and click OK"
                readonly
                prepend-icon="mdi-calendar-range"
                color="orange"
                required
                :error-messages="dateErrors"
                v-bind="attrs"
                v-on="on"
                id="date"
                @input="$v.date.$touch()"
                @blur="$v.date.$touch()"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn text color="primary" @click="$refs.menu.save(date)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-menu>
          <v-menu
            ref="timeMenu"
            v-model="timeMenu"
            :close-on-content-click="false"
            :return-value.sync="time"
            transition="scale-transition"
            offset-y
            id="timeMenu"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="time"
                prepend-icon="mdi-clock-outline"
                color="orange"
                label="Pick a time and click OK (Not required)"
                readonly
                v-bind="attrs"
                v-on="on"
                type="time"
                id="time"
              ></v-text-field>
            </template>
            <v-time-picker v-model="time" no-title scrollable>
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="timeMenu = false"
                >Cancel</v-btn
              >
              <v-btn text color="primary" @click="$refs.timeMenu.save(time)"
                >OK</v-btn
              >
            </v-time-picker>
          </v-menu>
          <v-checkbox
            v-model="checkbox"
            :error-messages="checkboxErrors"
            color="orange"
            label="Everything look good?"
            required
            id="checkBox"
            @change="$v.checkbox.$touch()"
            @blur="$v.checkbox.$touch()"
          ></v-checkbox>
          <v-btn
            dark
            color="green"
            id="createMeetup"
            class="mr-4 font-weight-bold"
            @click="submit"
            >Create Meetup</v-btn
          >
          <v-btn dark color="orange" font-weight-bold @click="clear"
            >Clear</v-btn
          >
        </form>
        <div class="text-center ma-2">
          <v-snackbar
            content-class="font-weight-bold"
            color="red"
            :centered="centered"
            v-model="snackbar"
            id="submitStatus"
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
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapFields } from 'vuex-map-fields';
import { mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';
export default {
  name: 'CreateMeetupForm',
  mixins: [validationMixin],
  validations: {
    eventName: { required, maxLength: maxLength(50) },
    details: { required },
    address: { required },
    date: { required },
    checkbox: {
      checked(val) {
        return val;
      },
    },
  },
  data() {
    return {
      checkbox: false,
      menu: false,
      timeMenu: false,
      submitStatus: '',
      snackbar: false,
      centered: true,
    };
  },
  computed: {
    ...mapFields([
      'meetupForm.eventName',
      'meetupForm.details',
      'meetupForm.time',
      'meetupForm.address',
      'meetupForm.date',
    ]),
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push('You must agree to continue!');
      return errors;
    },
    eventNameErrors() {
      const errors = [];
      if (!this.$v.eventName.$dirty) return errors;
      !this.$v.eventName.maxLength &&
        errors.push('Name must be at most 50 characters long');
      !this.$v.eventName.required && errors.push('Meetup name is required.');
      return errors;
    },
    detailsErrors() {
      const errors = [];
      if (!this.$v.details.$dirty) return errors;
      !this.$v.details.required && errors.push('Details is required');
      return errors;
    },
    addressErrors() {
      const errors = [];
      if (!this.$v.address.$dirty) return errors;
      !this.$v.address.required && errors.push('Address is required');
      return errors;
    },
    dateErrors() {
      const errors = [];
      if (!this.$v.date.$dirty) return errors;
      !this.$v.date.required && errors.push('Date is required');
      return errors;
    },
  },
  methods: {
    ...mapActions(['registerThisMeetup']),
    clear() {
      this.$v.$reset();
      this.eventName = '';
      this.details = '';
      this.address = '';
      this.time = '';
      this.date = '';
      this.checkbox = false;
    },
    async submit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.submitStatus = 'Must fill in all fields';
        this.snackbar = true;
      } else {
        // do your submit logic here
        await this.$store.dispatch('registerThisMeetup');
        this.submitStatus = 'Pending';
        setTimeout(() => {
          this.submitStatus = 'OK';
        }, 500);
      }
    },
  },
};
</script>
<style scoped>
.green {
  background: #76b852; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #8dc26f,
    #76b852
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #8dc26f,
    #76b852
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  margin: 10px;
}
.orange {
  margin: 10px;
}

.form-container {
  margin: 0 auto;
  margin-top: 5%;
}
</style>
