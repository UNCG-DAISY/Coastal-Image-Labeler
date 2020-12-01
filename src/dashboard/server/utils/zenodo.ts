const request = require('request')
const token = 'VBJcLrFid6lJ02Yb9VKspAybZH2Zin1bSUHGJfQDtU8BwMijNvxUijOBDAGj'

async function getDipostion(metadata) {
  return new Promise((resolve, reject) => {
    const url =
      'https://sandbox.zenodo.org/api/deposit/depositions?access_token=' + token
    const options = {
      method: 'POST',
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        metadata: {
          title: metadata.Title,
          upload_type: 'poster',
          version: metadata.Version,
          keywords: metadata.Keyword,
          language: metadata.Language,
          description: metadata.Description,
          creators: [{ name: metadata.Author, affiliation: 'Zenodo' }],
        },
      }),
    }
    request(options, function (error, response) {
      if (error) {
        reject(new Error(error))
      } else {
        const res = JSON.parse(response.body)
        if (res && res.errors) {
          reject(res.errors)
        } else {
          resolve(res)
        }
      }
    })
  })
}

async function uploadFiles(filesData, dipostionData) {
  return new Promise((resolve, reject) => {
    //
    //'https://sandbox.zenodo.org/api/deposit/depositions/693320/files?access_token=yourtoken,
    const url = dipostionData.files + '?access_token=' + token
    const options = {
      method: 'POST',
      url: url,
      headers: {},
      formData: {
        name: filesData.fileName,
        file: {
          value: filesData.value,
          options: {
            filename: filesData.fileName,
            contentType: null,
          },
        },
      },
    }
    request(options, function (error, response) {
      if (error) {
        console.log('Error at uploadFiles() ', error)
        reject(new Error(error))
      } else {
        const res = JSON.parse(response.body)
        if (res && res.errors) {
          reject(res.errors)
        } else {
          resolve(res)
        }
      }
    })
  })
}

async function publishToZenodo(dipostionData) {
  return new Promise((resolve, reject) => {
    //'https://sandbox.zenodo.org/api/deposit/depositions/693320/actions/publish?access_token=yourtoken,
    const url = dipostionData.publish + '?access_token=' + token
    const options = {
      method: 'POST',
      url: url,
      headers: {},
    }
    request(options, function (error, response) {
      if (error) {
        console.log('Error while publising the Diposition :' + error)
        reject(new Error(error))
      } else {
        console.log(
          'Diposition published success ' + JSON.stringify(response.body)
        )
        const res = JSON.parse(response.body)
        if (res && res.errors) {
          reject(res.errors)
        } else {
          resolve(res)
        }
      }
    })
  })
}

export async function upload(metaData, fileData) {
  try {
    const dipsition: any = await getDipostion(metaData)
    if (dipsition && dipsition.links) {
      await uploadFiles(fileData, dipsition.links)
      return await publishToZenodo(dipsition.links)
    } else {
      throw 'issue in upload'
    }
  } catch (error) {
    console.log('Exception while uploading file :', error)
    throw error
  }
}
