<template>
  <div class="qk-main-content">
    <page-breadcrumbs page-title="用户授权" />
    <v-container class="py-0">
      <div class="qk-table-header">
        <div class="table-title">检索</div>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="searchText"
          placeholder="请输入用户名/小区地址"
          append-icon="mdi-magnify"
          single-line
          hide-details
        ></v-text-field>
      </div>
    </v-container>

    <v-container>
      <v-dialog v-model="ctrl.dialog" max-width="55%">
        <v-card elevation="2">
          <v-card-title>
            <div class="title">{{ authItem.name }}授权</div>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  v-for="(it, idx) in permissions"
                  :key="'_perid_' + idx"
                  cols="3"
                >
                  <v-checkbox
                    v-model="it.selected"
                    :label="it.name"
                  ></v-checkbox>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click.stop="saveDialogHandle">保存</v-btn>
            <v-btn text @click="cancelDialogHandle">关闭</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="cards"
        :single-select="ctrl.singleSelect"
        :search="searchText"
        show-select
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small @click="authorizeHandle(item)">mdi-pencil</v-icon>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import PageBreadcrumbs from '@/ui/widgets/PageBreadcrumbs.vue';
export default {
  name: 'CardAuthorization',
  components: { PageBreadcrumbs },
  data() {
    return {
      searchText: '',
      tabloading: false,
      authItem: {
        did: '',
        name: '',
        permissions: [],
      },
      ctrl: {
        singleSelect: true,
        dialog: false,
      },
      headers: [
        { text: '编号', align: 'center', sortable: false, value: 'cardNo' },
        { text: '用户名', align: 'center', sortable: true, value: 'name' },
        { text: '单元楼', align: 'start', sortable: true, value: 'tagDesc' },
        { text: 'DID', align: 'start', sortable: true, value: 'did' },
        { text: '操作', align: 'center', value: 'actions' },
      ],
      selected: [],
      cards: [
        {
          did: 'did3aSAwVCBHTMVqFeH4wBbSBieTxyH5ApTE15oozaRv62B',
          name: 'lee',
          cardNo: '9527',
          tagDesc: 'hshhs1',
          authItemCount: 0,
        },
        {
          did: 'did3aSAwVCBHTMVqFeH4wBbSBieTxyH5ApTE15oozaRv62M',
          name: 'jjjj',
          cardNo: '9528',
          tagDesc: 'hshhs2',
          authItemCount: 0,
        },
      ],
      permissions: [
        { id: 'pb001', name: '5单元门禁', desc: '', selected: false },
        { id: 'pc002', name: '小区门禁', desc: '', selected: false },
        { id: 'cbd003', name: '商业区', desc: '', selected: false },
        { id: 'pt004', name: 'XX酒店5018', desc: '', selected: false },
        { id: 'pt005', name: 'XX酒店5019', desc: '', selected: false },
      ],
    };
  },
  computed: {
    dynamicAuthItems() {
      const permissions = this.authItem.permissions || [];
      return (this.permissions || []).map((p) => {
        if (permissions.includes(p.id)) p.selected = true;
        return p;
      });
    },
  },
  methods: {
    authorizeHandle(item) {
      let permissions = item.permissions || [];
      this.permissions = this.permissions.map((p) => {
        if (permissions.includes(p.id)) {
          p.selected = true;
        } else {
          p.selected = false;
        }
        return p;
      });

      this.authItem = Object.assign(this.authItem, {
        did: item.did,
        name: item.name,
        permissions: permissions,
      });

      this.ctrl.dialog = true;
    },
    resetAuthItem() {
      const item = {
        did: '',
        name: '',
        permissions: [],
      };
      this.authItem = Object.assign({}, item);
      this.permissions = this.permissions.map((p) => {
        p.selected = false;
        return p;
      });
    },
    cancelDialogHandle() {
      this.resetAuthItem();
      this.ctrl.dialog = false;
    },
    saveDialogHandle() {
      const perids = this.permissions
        .filter((p) => p.selected === true)
        .map((p) => p.id);
      const did = this.authItem.did;
      this.mockAuthor(did, perids);
      this.ctrl.dialog = false;
    },
    mockAuthor(did, perids) {
      const index = (this.cards || []).findIndex((c) => c.did === did);
      if (index >= 0) {
        let item = Object.assign({}, this.cards[index], {
          permissions: perids || [],
        });

        this.cards.splice(index, 1, item);
      }
    },
  },
};
</script>
<style>
.qk-table-header {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
