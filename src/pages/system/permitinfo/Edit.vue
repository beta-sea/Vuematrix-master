<template>
  <div class="wrapbox">
    <br />
    <a-form-model ref="ruleForm"
                  :model="form"
                  :rules="rules"
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol">
      <a-row>
        <a-col :span="spanCol">
          <a-form-model-item label="编号"
                             prop="permitNo"
                             ref="permitNo">
            <a-input v-model="form.permitNo" readOnly/>
          </a-form-model-item>
        </a-col>
        <a-col :span="spanCol">
          &nbsp;
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="spanCol">
          <a-form-model-item label="菜单名称"
                             prop="permitName"
                             ref="permitName">
            <a-input v-model="form.permitName" />
          </a-form-model-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-model-item label="菜单类型"
                             prop="permitType"
                             ref="permitType">
            <a-radio-group v-model="form.permitType">
              <a-radio value="M">M目录</a-radio>
              <a-radio value="C">C菜单</a-radio>
              <a-radio value="F">F按钮</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="spanCol">
          <a-form-model-item label="上级菜单"
                             prop="parentNo"
                             ref="parentNo">
            <a-tree-select v-model="form.parentNo"
                        :multiple="false"
                        :allow-clear="false"
                        :show-search="false"
                        :tree-data="treeData"
                        placeholder="请选择类型" />
          </a-form-model-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-model-item label="显示排序"
                             prop="orderNo"
                             ref="orderNo">
            <a-input-number v-model="form.orderNo" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="spanCol">
          <a-form-model-item label="权限标识"
                             prop="permitCode"
                             ref="permitCode">
            <a-input v-model="form.permitCode" />
          </a-form-model-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-model-item label="组件路径"
                             prop="component"
                             ref="component">
            <a-input v-model="form.component" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-model-item label="页面地址"
                             prop="pathUrl"
                             ref="pathUrl"
                             :labelCol="{span: 3}"
                             :wrapperCol="{span: 20}">
            <a-input v-model="form.pathUrl" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="spanCol">
          <a-form-model-item label="菜单图标"
                             prop="menuIcon"
                             ref="menuIcon">
            <a-input v-model="form.menuIcon" />
          </a-form-model-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-model-item label="是否外链"
                             prop="linkType"
                             ref="linkType">
            <a-radio-group v-model="form.linkType">
              <a-radio value="0">内部链接</a-radio>
              <a-radio value="1">外部链接</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="spanCol">
          <a-form-model-item label="重定向"
                             prop="redirect"
                             ref="redirect">
            <a-input v-model="form.redirect" />
          </a-form-model-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-model-item label="打开方式"
                             prop="target"
                             ref="target">
            <a-radio-group v-model="form.target">
              <a-radio value="menuItem">页签</a-radio>
              <a-radio value="menuBlank">新窗口</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="spanCol">
          <a-form-model-item label="显示状态"
                             prop="visible"
                             ref="visible">
            <a-radio-group v-model="form.visible">
              <a-radio value="1">显示</a-radio>
              <a-radio value="0">隐藏</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-model-item label="菜单状态"
                             prop="checkState"
                             ref="checkState">
            <a-radio-group v-model="form.checkState">
              <a-radio value="1">正常</a-radio>
              <a-radio value="0">停用</a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="24">
          <a-form-item label="备注"
                       :labelCol="{span: 3}"
                       :wrapperCol="{span: 20}">
            <a-textarea v-model="form.comments"
                        placeholder="备注信息"
                        :autoSize="{ minRows: 3, maxRows: 5 }" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form-model>
    <a-divider />
    <div class="btnbox">
      <a-button @click="doOk"
                type="primary">确定</a-button>
      <a-button @click="doCancel">取消</a-button>
    </div>
  </div>
</template>

<script>
import { getPermitinfo, treePermitinfo, addPermitinfo, uptPermitinfo } from '@/api/system/permitinfo'

export default {
  name: 'Edit',
  props: {
    layerid: {// 自动注入的layerid
      type: String,
      default: ''
    },
    id: {// 传递的数据
      type: String,
      default: ''
    },
    parentNo: {// 传递的数据
      type: String,
      default: ''
    },
    lydata: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      spanCol: 12,
      form: {
        permitNo: '0',
        permitName: '',
        permitCode: '',
        permitType: 'M',
        parentNo: '顶级',
        orderNo: 1,
        linkType: '0',
        menuIcon: 'none',
        pathUrl: '',
        component: 'MenuView/PageView',
        redirect: 'noredirect',
        target: 'menuItem',
        visible: '1',
        checkState: '1',
        comments: ''
      },
      rules: {
        permitName: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        permitCode: [
          { required: true, message: '请输入权限标识', trigger: 'blur' }
        ],
        parentNo: [
          { required: true, message: '请选择上级类型', trigger: 'change' }
        ],
        orderNo: [
          { required: true, message: '请输入排序值', trigger: 'blur' }
        ],
        pathUrl: [
          { required: true, message: '请输入页面路径', trigger: 'blur' }
        ],
        component: [
          { required: true, message: '请输入组件路径', trigger: 'blur' }
        ]
      },
      treeData: []
    }
  },
  methods: {
    doOk () {
      const that = this
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          if (that.form.permitNo === '0') {
            addPermitinfo(that.form).then(response => {
              that.$layer.msg(response.msg)
              that.$parent.getDataSource()
              that.$layer.close(that.layerid)
            })
          } else {
            uptPermitinfo(that.form).then(response => {
              that.$layer.msg(response.msg)
              that.$parent.getDataSource()
              that.$layer.close(that.layerid)
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    doCancel () {
      this.$layer.close(this.layerid)
    }
  },
  mounted () {
    const that = this
    if (this.id !== '') {
      getPermitinfo(this.id).then(response => {
        that.form = response.data
      })
    } else {
      if (that.parentNo !== '') {
        that.form.parentNo = that.parentNo
      }
    }
    treePermitinfo().then(response => {
      that.treeData = response.rows
    })
  }
}
</script>

<style lang="less" scoped>
.wrapbox {
  margin: 0;
  padding: 10px;
  width:100%;
}
.btnbox {
  text-align: center;
}
</style>
