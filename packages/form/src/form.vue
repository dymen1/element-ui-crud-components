<template>
  <div class="entity">
    <el-row type="flex" justify="center" :gutter="0">
      <el-card style="width:90%">
        <div slot="header">
          <span>{{ ucFirst(resource) }}</span>
          <span v-if="entity.id">&nbsp;::&nbsp;{{ entity.id }}</span>
        </div>

        <el-form v-if="entityData"
                 :model="entityData" :rules="rules"
                 ref="form" @reset.native="resetForm"
                 label-position="left" label-width="200px">
          <template v-for="(value, key) in entityData">
            <!-- Inputs -->
            <!-- Check if we need to render a hidden input -->
            <input v-if="hiddenInputs.includes(key)"
                   type="hidden" v-model="entityData[key]" :readonly="true"/>

            <el-form-item v-else-if="!noInputs.includes(key)"
                          :prop="key" :label="$t( plural + '.' + key )+':'">
              <!-- Check if we need to render a select -->
              <template v-if="selectConfig.hasOwnProperty(key)">
                <el-select v-model="entityData[key]"
                           :multiple="value instanceof Array"
                           :disabled="readonly(key)"
                           filterable
                           :collapse-tags="!readonly(key)">
                  <el-option
                          v-for="item in selectOptions[key].options"
                          :key="item.value"
                          :value="item.value"
                          :label="item.label">
                  </el-option>
                </el-select>
              </template>
              <!-- Everything else is a text input -->
              <template v-else>
                <span v-if="value instanceof Array">"{{ key }}" can't be rendered as text input.</span>
                <el-input v-else v-model="entityData[key]" :readonly="readonly(key)"/>
              </template>
            </el-form-item>
            <!-- Inputs -->
          </template>

          <slot
                  v-bind:entityData="entityData"
                  v-bind:plural="plural"
          ></slot>

          <!-- Buttons -->
          <el-row>
            <el-col :span="14">
              <el-form-item>
                <!--<el-button-group>-->
                <nuxt-link :to="backLink ? backLink : '/' + plural">
                  <el-button @click="goingBack=true" :loading="goingBack" icon="el-icon-back">
                    {{ backButtonLabel }}
                  </el-button>
                </nuxt-link>
                <el-button @click="deleteEntity" :loading="submitting" icon="el-icon-delete"
                           v-if="readonly()" type="danger">
                  {{ $t('crud.buttonLabel.delete', { resource: this.resource.toLowerCase() }) }}
                </el-button>
                <el-button @click="handleFormSubmit" :loading="submitting" icon="el-icon-upload"
                           v-if="!readonly()" type="primary">
                  {{ persistButtonLabel }}
                </el-button>
                <el-button v-if="!readonly()" native-type="reset" icon="el-icon-circle-close" type="warning">
                  {{ $t('crud.buttonLabel.reset') }}
                </el-button>
                <!--</el-button-group>-->
              </el-form-item>
            </el-col>

            <!-- Extra Buttons -->
            <el-col :span="10">
              <el-form-item v-if="extraButtons" style="text-align: right">
                <template v-for="button in extraButtons">
                  <el-button
                          @click="button.handler ? button.handler($event) : ''"
                          :type="button.type ? button.type : 'default'">
                    {{ $t(button.label) }}
                  </el-button>
                </template>
              </el-form-item>
            </el-col>
            <!-- Extra Buttons -->
          </el-row>
          <!-- Buttons -->
        </el-form>

        <h3 v-else>No data</h3>
      </el-card>
    </el-row>
  </div>
</template>

<script>
  import Vue from 'vue';
  import Component from 'class-component';
  import moment from 'moment';

  // TODO: validation astrix behind label

  @Component({
    props: {
      resource: String,
      backLink: {
        type: String,
        default: undefined,
      },
      entity: Object,
      mode: {
        type: String,
        default: 'edit',
      },

      hiddenInputs: {
        type: Array,
        default: () => ([]),
      },
      noInputs: {
        type: Array,
        default: () => ([]),
      },
      readOnlyInputs: {
        type: Array,
        default: () => ([]),
      },
      selectConfig: {
        type: Object,
        default: () => ({}),
      },

      extraButtons: {
        type: Object,
        default: () => (undefined),
      },
    },
  })
  export default class Form extends Vue {
    goingBack = false;
    submitting = false;
    resetting = false; // We only need this to allow for a form reset...
    rules = { // TODO: move rules to props
      name: [
        {required: true, trigger: 'blur'}, //message: 'Please input Activity name',
        {min: 3, message: 'Needs to be > 3 characters', trigger: 'blur'},
      ],
    };
    entityData = null;

    // lifecycle hook
    mounted () {
      // We only need this to allow for a form reset...
      if (this.resetting) this.resetting = false;

      let data = {};
      if (!this.entity) return null;

      Object.entries(this.entity).forEach(([key, value]) => {
        // Don't add fields that we don't want to see
        switch (this.readonly()) {
          case true:
            if (['id'].includes(key)) return;
            break;
          case false:
            if (['id', 'createdAt', 'updatedAt'].includes(key)) return;
            break;
        }

        // format dates
        let date = moment(value, moment.ISO_8601, true);
        if (date.isValid()) value = this.$d(date, 'long');

        data[key] = value;
      });
      this.entityData = data;
    }

    /**
     * Gets the form's selectOptions, this is done by using selectConfig to populate the options.
     * @returns String
     */
    get selectOptions() {
      let options = {};
      // handle selectOptions
      Object.entries(this.selectConfig).forEach(([key, value]) => {
        if (value instanceof Array) {
          options[key] = {
            optionsFiltered: [],
            options: value
          };
          return;
        }
        if (typeof value === typeof 'string') {
          options[key] = {
            optionsFiltered: [],
            options: this.$store.getters[value + '/selectOptions'],
            method: (query) => {
              if (query !== '') {
                setTimeout(() => {
                  options[key].optionsFiltered = options[key].options.filter(item => {
                    return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
                  });
                }, 200);
              } else {
                options[key].optionsFiltered = [];
              }
            },
          };
        }
      });
      return options;
    }

    /**
     * Gets the resource's plural, from it's store.
     * @returns String
     */
    get plural() {
      return this.$store.getters[this.resource.toLowerCase() + '/plural'];
    }

    /**
     * Returns true when mode is 'read'
     * Returns true when a key is given and is present in readOnlyInputs
     * @returns Boolean
     */
    readonly(key) {
      let isReadonly = this.mode === 'read';
      if (key && this.readOnlyInputs.includes(key)) {
        isReadonly = true;
      }
      return isReadonly;
    }

    /**
     * Returns the correct back button label
     * @returns String
     */
    get backButtonLabel() {
      switch (this.mode) {
        case 'read':
          return this.$t('crud.buttonLabel.back');
        case 'edit':
          return this.$t('crud.buttonLabel.cancel');
        case 'create':
          return this.$t('crud.buttonLabel.cancel');
        default:
          return this.$t('crud.buttonLabel.back');
      }
    }

    /**
     * Returns the correct persist button label
     * @returns String
     */
    get persistButtonLabel() {
      switch (this.mode) {
        case 'edit':
          return this.$t('crud.buttonLabel.update', { resource: this.resource.toLowerCase() });
        case 'create':
          return this.$t('crud.buttonLabel.create', { resource: this.resource.toLowerCase() });
        default:
          return this.$t('crud.buttonLabel.update');
      }
    }

    /**
     * Resets the form to it's original state.
     * @param event
     */
    resetForm(event) {
      // We only need this to allow for a form reset...
      this.resetting = true;
      // Actual form reset logic
      this.$refs.form.$children.forEach((formItem) => {
        if (!formItem.prop) return;
        formItem.$children.forEach((input) => {
          // Not an formItem with a input
          if (!input.$refs.input) {
            // And not a select with a input
            if (!input.$refs.reference.$refs.input) return;
          }
          // Has no setCurrentValue method
          if (!input.setCurrentValue || !input.clear) {
            // And has no setSelected method
            if (!input.setSelected) return;
          }
          // If we have entityData then set it, if not then clear
          if (this.entity) {
            formItem.resetField();
            return;
          }
          input.clear();
        });
      });
      // We still want to prevent the default reset behavior
      if (event) event.preventDefault();
    }

    /**
     * TODO: allow overwrite via property
     * Handles form submit.
     * Validates the form and triggers a store dispatch.
     */
    handleFormSubmit() {
      this.submitting = true;
      this.$refs.form.validate(async (valid) => {
        try {
          if (valid) {
            let id;
            if (this.mode === 'edit') this.entityData.id = id = this.entity.id;
            let {entity, message} = await this.$store.dispatch(
                    this.resource.toLowerCase() + '/persist',
                    {data: this.entityData, id: id},
            );
            // TODO: display success message
            this.$router.push('/' + this.plural);
          }
        } catch (e) {
          this.$message.warning(e.message);
        } finally {
          this.submitting = false;
        }
      });
    }

    /**
     * Triggers a store dispatch.
     */
    async deleteEntity() {
      this.submitting = true;
      try {
        let id = this.entity.id;
        let {message} = await this.$store.dispatch(
                this.resource.toLowerCase() + '/delete',
                id,
        );
        // TODO: display success message
        this.$router.push('/' + this.plural);
      } catch (e) {
        this.$message.warning(e.message);
      } finally {
        this.submitting = false;
      }
    }

    /**
     * return the input with the first character as uppercase.
     * @param string
     * @returns {string}
     */
    ucFirst(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
</script>

<style lang="scss" scoped>
  .entity {
    margin-bottom: 35px;

    .el-row {
      margin-top: 35px;

      .el-card {

        .el-row:first-child {
          margin-top: 0px;
        }
      }
    }

    .el-form-item__content {

      & > a + .el-button {
        margin-left: 10px;
      }
    }
  }
</style>
