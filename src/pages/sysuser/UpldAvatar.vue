<template>
  <div class="wrapbox">
    <a-row>
      <a-col :md="12" :style="{height: '350px'}">
        <vue-cropper
          ref="cropper"
          :img="options.img"
          :info="true"
          :autoCrop="options.autoCrop"
          :autoCropWidth="options.autoCropWidth"
          :autoCropHeight="options.autoCropHeight"
          :fixedBox="options.fixedBox"
          @realTime="realTime"
        >
        </vue-cropper>
      </a-col>
      <a-col :md="12" :style="{height: '350px'}">
        <div class="avatar-upload-preview">
          <img :src="previews.url" :style="previews.img"/>
        </div>
      </a-col>
    </a-row>
    <br>
    <a-row>
      <a-col :md="12" style="text-align:center;">
        <a-upload name="file" :beforeUpload="beforeUpload" :showUploadList="false">
          <a-button icon="upload">选择图片</a-button>
        </a-upload>
        <a-button icon="plus" @click="changeScale(1)"/>
        <a-button icon="minus" @click="changeScale(-1)"/>
        <a-button icon="undo" @click="rotateLeft"/>
        <a-button icon="redo" @click="rotateRight"/>
      </a-col>
      <a-col :md="12" style="text-align:center;">
        <a-button type="primary" @click="uploadImg('blob')">保存</a-button>
        <a-button @click="doCancel" style="margin-left: 8px">关闭</a-button>
      </a-col>
    </a-row>
  </div>

</template>
<script>
import { uploadAvatar } from '@/api/system/suserinfo'

export default {
  props: {
    layerid: {// 自动注入的layerid
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
      options: {
        img: '',
        autoCrop: true,
        autoCropWidth: 200,
        autoCropHeight: 200,
        fixedBox: true
      },
      previews: {}
    }
  },
  methods: {
    changeScale (num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    rotateLeft () {
      this.$refs.cropper.rotateLeft()
    },
    rotateRight () {
      this.$refs.cropper.rotateRight()
    },
    beforeUpload (file) {
      const reader = new FileReader()
      // 把Array Buffer转化为blob 如果是base64不需要
      // 转化为base64
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.options.img = reader.result
      }
      // 转化为blob
      // reader.readAsArrayBuffer(file)

      return false
    },
    // 上传图片（点击上传按钮）
    uploadImg (type) {
      const that = this
      // 输出
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob(data => {
          let formData = new FormData()
          formData.append('avatarfile', data)
          uploadAvatar(formData).then(response => {
            if (response.code === 200) {
              that.options.img = process.env.BASE_API + response.imgUrl
              that.$layer.msg(response.msg)
            }
            // that.$message.success(response.msg)
            // that.$refs.cropper.clearCrop()
          })
        })
      }
    },
    doCancel () {
      this.$layer.close(this.layerid)
    },
    realTime (data) {
      this.previews = data
    }
  }
}
</script>

<style lang="less" scoped>
.wrapbox {
  margin: 0;
  padding: 10px;
  width:100%;
}

  .avatar-upload-preview {
    position: absolute;
    top: 50%;
    transform: translate(50%, -50%);
    width: 180px;
    height: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
