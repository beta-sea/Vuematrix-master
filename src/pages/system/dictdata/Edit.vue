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
                             prop="dataNo"
                             ref="dataNo">
            <a-input v-model="form.dataNo" readOnly/>
          </a-form-model-item>
        </a-col>
        <a-col :span="spanCol">
          &nbsp;
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="spanCol">
          <a-form-model-item label="编码"
                             prop="dictCode"
                             ref="dictCode">
            <a-input v-model="form.dictCode" />
          </a-form-model-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-model-item label="类型"
                             prop="dictType"
                             ref="dictType">
            <a-tree-select v-model="form.dictType"
                        :multiple="false"
                        :allow-clear="false"
                        :show-search="false"
                        :tree-data="treeData"
                        placeholder="请选择类型" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="spanCol">
          <a-form-model-item label="名称"
                             prop="dictKey"
                             ref="dictKey">
            <a-input v-model="form.dictKey" />
          </a-form-model-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-model-item label="键值"
                             prop="dictValue"
                             ref="dictValue">
            <a-input v-model="form.dictValue" />
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="spanCol">
          <a-form-model-item label="显示排序"
                             prop="orderNo"
                             ref="orderNo">
            <a-input-number v-model="form.orderNo" />
          </a-form-model-item>
        </a-col>
        <a-col :span="spanCol">
          <a-form-model-item label="状态"
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
import { getDictdata, getTypelist, addDictdata, uptDictdata } from '@/api/system/dictdata'

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
        dataNo: '0',
        dictType: undefined,
        dictCode: '',
        dictKey: '',
        dictValue: '',
        orderNo: 1,
        checkState: '1',
        comments: ''
      },
      rules: {
        dictType: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        dictCode: [
          { required: true, message: '请输入编码', trigger: 'blur' }
        ],
        dictKey: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        dictValue: [
          { required: true, message: '请输入键值', trigger: 'blur' }
        ],
        orderNo: [
          { required: true, message: '请输入排序值', trigger: 'blur' }
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
          if (that.form.dataNo === '0') {
            addDictdata(that.form).then(response => {
              that.$layer.msg(response.msg)
              that.$parent.getDataSource()
              that.$layer.close(that.layerid)
            })
          } else {
            uptDictdata(that.form).then(response => {
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
      getDictdata(this.id).then(response => {
        that.form = response.data
      })
    }
    getTypelist().then(response => {
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
