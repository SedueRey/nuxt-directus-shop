<template>
  <article class="contact">
    <h1 class="contact__title">
      {{ $t('contactformtitle') }}
    </h1>
    <client-only>
      <div v-if="status === 'ok'">
        <p class="contact__excerpt">
          {{ $t('contactformexcerptthanks') }}
        </p>
      </div>
      <div v-else>
        <p class="contact__excerpt">
          {{ $t('contactformexcerpt') }}
        </p>
        <p class="contact__desc">
          {{ $t('contactformfillfields') }}
          <strong>
            {{ $t('contactformmandatory') }}
          </strong>
        </p>
        <label class="contact__label" for="username">{{ $t('contactformnamelabel') }}</label>
        <input
          id="username"
          v-model.trim="username"
          class="contact__input"
          :class="isValidName ? '' : 'is-invalid'"
          type="text"
          name="username"
          :placeholder="$t('contactformnameplaceholder')"
          @blur="modifiedName = true"
        >
        <span v-if="!isValidName" class="contact__error">
          {{ $t('contactformnameerror') }}
        </span>
        <label class="contact__label" for="useremail">{{ $t('contactformemaillabel') }}</label>
        <input
          id="useremail"
          v-model.trim="useremail"
          :class="isValidEmail ? '' : 'is-invalid'"
          class="contact__input"
          type="email"
          name="useremail"
          :placeholder="$t('contactformemailplaceholder')"
          @blur="modifiedEmail = true"
        >
        <span v-if="!isValidEmail" class="contact__error">
          {{ $t('contactformemailerror') }}
        </span>
        <label class="contact__label" for="usersubject">{{ $t('contactformsubjectlabel') }}</label>
        <input
          id="usersubject"
          v-model.trim="usersubject"
          :class="isValidSubject ? '' : 'is-invalid'"
          class="contact__input"
          type="text"
          name="usersubject"
          :placeholder="$t('contactformsubjectplaceholder')"
          @blur="modifiedSubject = true"
        >
        <span v-if="!isValidSubject" class="contact__error">
          {{ $t('contactformsubjecterror') }}
        </span>
        <label class="contact__label" for="usertext">{{ $t('contactformtextlabel') }}</label>
        <textarea
          id="usertext"
          v-model.trim="usertext"
          :class="isValidText ? '' : 'is-invalid'"
          class="contact__textarea"
          name="usertext"
          @blur="modifiedText = true"
        ></textarea>
        <span v-if="!isValidSubject" class="contact__error">
          {{ $t('contactformtexterror') }}
        </span>
        <button :disabled="isLoading || !isValidForm" class="contact__button" @click="submit">
          {{ $t('contactformsendbutton') }}
        </button>
      </div>
    </client-only>
  </article>
</template>

<script>
import head from '~/mixins/head'
export default {
  name: 'ContactPage',
  mixins: [head],
  data () {
    return {
      status: null,
      translate: {
        title: 'Contact form'
      },
      isLoading: false,
      username: '',
      modifiedName: false,
      useremail: '',
      modifiedEmail: false,
      usersubject: '',
      modifiedSubject: false,
      usertext: '',
      modifiedText: false
    }
  },
  computed: {
    isValidName () {
      return !this.modifiedName ? true : this.username.trim() !== ''
    },
    isValidEmail () {
      return !this.modifiedEmail ? true : (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.useremail.trim()))
    },
    isValidSubject () {
      return !this.modifiedSubject ? true : this.usersubject.trim() !== ''
    },
    isValidText () {
      return !this.modifiedText ? true : this.usertext.trim() !== ''
    },
    isValidForm () {
      return (
        this.modifiedName && this.modifiedEmail && this.modifiedSubject && this.modifiedText
      ) && (
        this.isValidName && this.isValidEmail && this.isValidSubject && this.isValidText
      )
    }
  },
  mounted () {
    if (this.$config.isFullStatic) {
      this.$router.replace('/')
    }
  },
  methods: {
    async submit () {
      this.loading = true
      this.status = await this.$contactform({
        username: this.username,
        usermail: this.useremail,
        usersubject: this.usersubject,
        usertext: this.usertext
      })
    }
  }
}
</script>

<style lang="scss">
.contact {
  @apply min-h-screen container mx-auto px-4 md:px-24 lg:px-72 space-y-2;
  &__title {
    @apply text-4xl text-tertiary font-headings leading-tight mt-8 mb-0;
  }
  &__excerpt {
    @apply text-quaternary font-subheadings leading-tight pb-4;
  }
  &__desc {
    @apply text-sm;
  }
  &__label {
    @apply block pt-4;
  }
  &__input,
  &__textarea {
    @apply block rounded-md w-full px-4 py-2 text-primary;
    &.is-invalid {
      border: 1px solid var(--error-border);
    }
  }
  &__error {
    color: var(--error);
    @apply block text-sm;
  }
  &__button {
    @apply float-right font-headings hover:bg-quaternary;
    @apply inline-block text-center py-4 px-6 md:px-6 mt-8;
    @apply border-quaternary text-secondary rounded-md border-2;
    &[disabled] {
      @apply cursor-not-allowed opacity-50;
    }
  }
}
</style>
