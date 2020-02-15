<template lang="pug">
transition( name="fade" )
  .apply-job-dialog( v-if="showForm" ref="apply-job-container" )
    .apply-job-title-and-close-button
      .apply-job-title-text
        | APPLY FOR THIS JOB
      .close-button( @click="closeForm" )
        img( src="https://img.icons8.com/ios-filled/50/000000/close-window.png" )
    .user-enter-data-container
      .user-input-container
        span.input-title FIRST NAME 
        span.requried-field *
        .input-container
          input.user-input( type="text" placeholder="James" v-model="firstName" :class="{ 'input-border-empty-field': firstNameFieldIsEmpty }" )
          .empty-field-notice( v-if="firstNameFieldIsEmpty" ) Ops, you forgot about this one
      .user-input-container
        span.input-title LAST NAME 
        span.requried-field *
        .input-container
          input.user-input( type="text" placeholder="Tangerin" v-model="lastName" :class="{ 'input-border-empty-field': lastNameFieldIsEmpty }" )
          .empty-field-notice( v-if="lastNameFieldIsEmpty" ) Ops, you forgot about this one
      .user-input-container
        span.input-title EMAIL 
        span.requried-field *
        .input-container
          input.user-input( type="text" placeholder="james@hotmail.com" v-model="email" @keypress="isEmailValid" :class="{ 'input-border-empty-field': emailFieldIsEmpty }" )
          .empty-field-notice( v-if="emailFieldIsEmpty" ) Dude, the Email can't be empty
          .empty-field-notice( v-if="shouldShowValidationError" ) Email Adress is not valid
      .user-input-container
        span.input-title PHONE 
        span.requried-field *
        .input-container
          input.user-input( type="text" placeholder="(123)543-344-236" v-model="phoneNumber" @keypress="validatePhoneNumber" :class="{ 'input-border-empty-field': phoneFieldIsEmpty }" )
          .empty-field-notice( v-if="phoneFieldIsEmpty" ) Hey, we need that phone number
      .user-input-container
        span.input-title LOCATION (CITY) 
        span.requried-field *
        .input-container
          input.user-input-location( type="text" placeholder="Virgin Islands" v-model="location" :class="{ 'input-border-empty-field': locationFieldIsEmpty }" )
          .empty-field-notice( v-if="locationFieldIsEmpty" ) Where do you live?

      .attatch-files-container
        .resume-cv-button
          input( type="file" @change="handleResumeUpload" )
          span.cv-button-title RESUME/CV 
          span.requried-field *
          .attach-cv-button Attach
          .resume-file-name( v-if="resumeFile" ) {{resumeFile.name}}
          .empty-field-notice( v-if="rsumeFieldIsEmpty" ) Hmmm, no CV!


        .resume-cv-button
          input( type="file" @change="handleCoverLetterUpload" )
          span.cv-button-title COVER LETTER 
          span.requried-field *
          .attach-cover-letter-button Attach
          .cover-letter-file-name( v-if="coverLetterFile" ) {{coverLetterFile.name}}
          .empty-field-notice( v-if="coverLetterIsEmpty" ) Hmmm, no Cover Letter!


    .submit-application-container
      .submit-application-button( @click="submitApplication" :disabled="submitButtonShouldBeDisabled" ) Submit

     

</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import axios from 'axios'

@Component({})
export default class JobForm extends Vue {
  firstName = null
  lastName = null
  email = null || ""
  phoneNumber = null || ""
  location = null
  showForm = true
  firstNameFieldIsEmpty = false
  lastNameFieldIsEmpty = false
  emailFieldIsEmpty = false
  phoneFieldIsEmpty = false
  locationFieldIsEmpty = false
  rsumeFieldIsEmpty = false
  coverLetterIsEmpty = false
  submitButtonShouldBeDisabled = false
  emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  shouldShowValidationError = false
  resumeFile = null 
  coverLetterFile = null



  mounted() {
    this.addListeneres()
  }


  submitApplication() {
    if( this.firstName && this.lastName && this.email && this.phoneNumber && this.location ) {
      //  do axios request here
      this.submitDataToServer()
    } else {
      if(!this.firstName) this.firstNameFieldIsEmpty = true
      if(!this.lastName) this.lastNameFieldIsEmpty = true
      if(!this.email) this.emailFieldIsEmpty = true
      if(!this.phoneNumber) this.phoneFieldIsEmpty = true
      if(!this.location) this.locationFieldIsEmpty = true
      if(!this.resumeFile) this.rsumeFieldIsEmpty = true
      if(!this.coverLetterFile) this.coverLetterIsEmpty = true
      if(!this.firstName || !this.lastName || !this.email || !this.phoneNumber || !this.location) this.submitButtonShouldBeDisabled = true

    }
  }

  submitDataToServer() {
    axios.post('https://some url goes here', {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      location: this.location,
      phoneNumber: this.phoneNumber,
      resume: this.resumeFile,
      coverLetter: this.coverLetterFile
    }).then(response => {
      console.log('done')
    }).catch(e => {
      console.log('there was an error')
    })
  }

  closeForm() {
    this.showForm = false
  }

  addListeneres() {
    document.addEventListener("keydown", this.onEscapePressed);
    document.addEventListener("click", this.onClickOutside);
  }

  onClickOutside(e: any) {
    if(!this.$refs['apply-job-container']) return;
    if (this.$refs["apply-job-container"].contains(e.target)) return;
    this.showForm = false
  }

  onEscapePressed(e: any) {
    if(e.key === 'Escape' || e.key == 'Esc') {
      this.showForm = false
    }
  }

  isEmailValid() {
    this.emailRegex.test(this.email) ? this.shouldShowValidationError = false : this.shouldShowValidationError = true
  }

  validatePhoneNumber(evt: any) {
    if (evt.keyCode !== 46 && (evt.keyCode < 48 || evt.keyCode > 57) || this.phoneNumber.length > 15) {
      evt.preventDefault()
    }
  }

  handleResumeUpload(e: any) {
    let file  = e.target.files || e.dataTransfer.files
    if(!file.length) return;
    this.resumeFile = file[0]

  }

  handleCoverLetterUpload(e: any) {
    let file  = e.target.files || e.dataTransfer.files
    if(!file.length) return;
    this.coverLetterFile = file[0]
  }

}
</script>

<style lang="sass">
.apply-job-dialog
  height: 627px
  width: 765px
  box-shadow: 0px 0px 192px -49px rgba(0,0,0,0.75)
  padding: 30px
  border-radius: 8px
  margin: 15px auto
  
.apply-job-title-and-close-button
  display: flex
  justify-content: space-between
  
.apply-job-title-text
  color: #4f545c
  font-size: 16px
  font-weight: 700
  
.close-button img
  height: 30px
  &:hover
    cursor: pointer
  
.user-enter-data-container
  margin-top: 4px
  display: flex
  justify-content: space-between
  flex-wrap: wrap
  
.requried-field
  color: red
  margin-left: 2px
  
.user-input
  color: #2e3338
  border-color: rgba(79,84,92,.3)
  padding: 10px
  border-radius: 3px
  width: 345px
  margin-top: 5px
  transition: .5s
  &:focus
    outline: none
  &:hover
    border-color: #7289da
    cursor: pointer
  
::-webkit-input-placeholder
  font-size: 14px
 
.user-input-container
  margin-top: 20px
  

.user-input-location
  color: #2e3338
  border-color: rgba(79,84,92,.3)
  padding: 10px
  border-radius: 3px
  width: 741px
  transition: .5s
  margin-top: 5px
  &:focus
    outline: none
  &:hover
    border-color: #7289da
    cursor: pointer
 
.resume-cv-button
  margin-top: 20px
  position: relative
  overflow: hidden
  width: 50%
  
.cv-button-title
  color: #36393f
  font-size: 17px
  font-weight: 700
  
.attach-cover-letter-button,
.attach-cv-button
  margin-top: 7px
  background-color: #000
  color: #fff
  width: 40%
  height: 50px
  border-radius: 3px
  transition: .2s ease-out
  font-weight: 800
  display: flex
  align-items: center
  justify-content: center
  &:hover
    cursor: pointer
    
  
.attatch-files-container
  margin-top: 10px
  display: flex
  justify-content: space-between
  width: 70%
  
.submit-application-container
  position: absolute
  bottom: 0
  right: 330px
.submit-application-button
  background-color: #000
  color: #fff
  padding: 5px
  width: 100px
  height: 50px
  border-radius: 3px
  transition: .2s ease-out
  font-weight: 800
  display: flex
  align-items: center
  justify-content: center
  &:hover
    cursor: pointer
  &[disabled]
   opacity: .5
   cursor: default

.empty-field-notice
  color: #f25246
  font-weight: 500

.input-border-empty-field
  border: 1px solid #f25246
  transition: 0

input[type="file"]
  position: absolute
  left: 0
  top: 40px
  opacity: 0
  padding: 20px
  &:hover 
    cursor: pointer

.cover-letter-file-name,
.resume-file-name
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  margin-top: 5px
  width: 150px

//  media queries to make the form responsive 
@media only screen and (max-width: 890px) 
  .apply-job-dialog
    width: auto
    height: auto
  .user-enter-data-container
    display: flex 
    flex-direction: column
    flex-wrap: wrap

  .user-input-container
  
  .user-input,
  .user-input-location
    width: 90%

  .attatch-files-container
    display: flex
    width: 100%
    flex-direction: row
    justify-content: space-around

//  animations 
.fade-enter-active, .fade-leave-active 
  transition: opacity .5s

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ 
  opacity: 0

</style>