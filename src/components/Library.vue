<template>
  <v-container>
    <v-data-table :headers="tableHeaders" :items="secures" :search="search" item-key="primaryKey">
      <!-- Custom password and otp column -->
      <template v-slot:item.password="{ item }">
        <v-text-field :append-icon="item.showPassword ? 'mdi-eye-off' : 'mdi-eye'" :type="item.showPassword ? 'text' : 'password'" :value="item.password"
                      name="password"
                      readonly
                      @click:append="() => (item.showPassword = !item.showPassword)"></v-text-field>
      </template>
      <template v-slot:item.otp="{ item }">
        <v-text-field :append-icon="item.showOtp ? 'mdi-eye-off' : 'mdi-eye'" :type="item.showOtp ? 'text' : 'password'" :value="item.otp"
                      name="otp"
                      readonly
                      @click:append="() => (item.showOtp = !item.showOtp)"></v-text-field>
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog.inputKey">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on">
                刷新
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span>请输入主密码</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-text-field v-model="key" label="key" type="password"></v-text-field>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="closeInputKeyDialog">
                  取消
                </v-btn>
                <v-btn color="blue darken-1" text @click="fetchSecure">
                  确定
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialog.add">
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on" color="primary">
                添加密码
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span>添加密码</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field v-model="addedSecure.id" label="ID">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field v-model="addedSecure.platform" label="Platform">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field v-model="addedSecure.friendlyName"
                                    label="Friendly Name">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field v-model="addedSecure.username" label="Username">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field v-model="addedSecure.password" label="Password"
                                    type="password">
                      </v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field v-model="key" label="Key" type="password">
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="closeAddDialog">
                  取消
                </v-btn>
                <v-btn color="blue darken-1" text @click="addSecure">
                  确定
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>

        <v-text-field v-model="search" class="mx-4" label="搜索"></v-text-field>

        <v-dialog v-model="dialog.delete">
          <v-card>
            <v-card-title class="headline">此操作不可撤销，是否删除？</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="closeDeleteConfirmDialog">取消</v-btn>
              <v-btn color="blue darken-1" text @click="deleteSecureConfirm">确定</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog v-model="dialog.update">
          <v-card>
            <v-card-title>
              <span>修改密码</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="updatedSecure.id" label="ID">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="updatedSecure.platform" label="Platform">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="updatedSecure.friendlyName"
                                  label="Friendly Name">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="updatedSecure.username" label="Username">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="updatedSecure.password" label="Password"
                                  type="password">
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field v-model="key" label="Key" type="password">
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="closeUpdateDialog">
                取消
              </v-btn>
              <v-btn color="blue darken-1" text @click="updateSecureConfirm">
                确定
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="mr-2" small @click="generateOtp(item)">
          mdi-eye
        </v-icon>
        <v-icon class="mr-2" small @click="updateSecure(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteSecure(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import axios from "axios";

export default {
  name: "Library",
  data: () => ({
    key: '',
    search: '',
    secures: [],

    addedSecure: {
      id: '',
      //domain-name by default
      platform: 'domain-name',
      friendlyName: '',
      username: '',
      password: '',
      otp: '',
      otpType: ''
    },
    deleteArray: [],
    updatedSecurePrimaryKey: '',
    updatedSecure: {
      id: '',
      platform: '',
      friendlyName: '',
      username: '',
      password: '',
      otp: '',
      otpType: ''
    },

    dialog: {
      add: false,
      delete: false,
      inputKey: false,
      update: false
    },

    tableHeaders: [{
      text: 'ID',
      align: 'start',
      sortable: false,
      value: 'id'
    }, {
      text: 'Platform',
      sortable: false,
      value: 'platform'
    }, {
      text: 'Friendly Name',
      sortable: false,
      value: 'friendlyName'
    }, {
      text: 'Username',
      sortable: false,
      value: 'username'
    }, {
      text: 'Password',
      sortable: false,
      value: 'password'
    }, {
      text: 'OTP',
      sortable: false,
      value: 'otp',
      align: 'd-none'
    }, {
      text: 'OTP Type',
      sortable: false,
      value: 'otpType',
      align: 'd-none'
    }, {
      text: 'Actions',
      value: 'actions',
      sortable: false
    },]
  }),
  methods: {
    addSecure: function () {
      let addedSecureMap = {
        secure: [this.addedSecure],
        key: this.key
      }
      let addedSecureJson = JSON.stringify(addedSecureMap)
      axios.post('/api/library', addedSecureJson).then(
          function (response) {
            if (response.status === 200) {
              alert('添加成功')
            } else {
              alert('添加失败')
            }
          }
      )

      this.closeAddDialog()
      this.fetchSecure()
    },
    openAddDialog: function () {
      this.dialog.add = true
    },
    closeAddDialog: function () {
      this.dialog.add = false
    },

    deleteSecure: function (item) {
      this.deleteArray.push(item.primaryKey)

      this.openDeleteConfirmDialog()
    },
    deleteSecureConfirm: function () {
      const primaryKey = this.deleteArray[0]
      const deleteUrl = '/api/library/' + primaryKey

      axios.delete(deleteUrl).then(
          function (response) {
            if (response.status === 200) {
              alert('删除成功')
            } else {
              alert('删除失败')
            }
          }
      )

      this.closeDeleteConfirmDialog()
      this.fetchSecure()
    },
    openDeleteConfirmDialog: function () {
      this.dialog.delete = true
    },
    closeDeleteConfirmDialog: function () {
      this.dialog.delete = false
    },

    updateSecure: function (item) {
      this.updatedSecurePrimaryKey = item.primaryKey
      this.updatedSecure = item
      this.openUpdateDialog()
    },
    updateSecureConfirm: function () {
      let putUrl = '/api/library/' + this.updatedSecurePrimaryKey
      let updatedSecureMap = {
        key: this.key,
        secure: [this.updatedSecure]
      }
      let updatedSecureJson = JSON.stringify(updatedSecureMap)
      axios.put(putUrl, updatedSecureJson).then(
          function (response) {
            if (response.status === 200) {
              alert('更新成功')
            } else {
              alert('更新失败')
            }
          }
      )

      this.closeUpdateDialog()
      this.fetchSecure()
    },
    openUpdateDialog: function () {
      this.dialog.update = true
    },
    closeUpdateDialog: function () {
      this.dialog.update = false
    },

    fetchSecure: function () {
      const url = '/api/library?key=' + this.key

      if (this.key.length === 0) {
        this.openInputKeyDialog()
        return
      } else {
        this.closeInputKeyDialog()
      }

      this.secures.length = 0

      const self = this
      axios.get(url)
          .then(function (response) {
            let responseData = response.data

            Object.keys(response.data).map((key) => {
                  self.secures.push({
                    primaryKey: key,
                    id: responseData[key].id,
                    platform: responseData[key].platform,
                    friendlyName: responseData[key].friendlyName,
                    username: responseData[key].username,
                    password: responseData[key].password,
                    otp: responseData[key].otp,
                    otpType: responseData[key].otpType,

                    showPassword: '',
                    showOtp: ''
                  })
                }
            )
          })
    },
    openInputKeyDialog: function () {
      this.dialog.inputKey = true
    },
    closeInputKeyDialog: function () {
      this.dialog.inputKey = false
    },
    generateOtp: function (item) {
      const url = '/api/library/' + item.primaryKey + '/otp?key=' + this.key
      axios.get(url).then(function (response) {
        alert(response.data['passCode'])
      })
    }
  }
}
</script>

<style scoped>

</style>