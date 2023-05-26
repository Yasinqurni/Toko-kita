const fs = require('fs')
const {uploadFile, __basedir, deleteImageCloudinary } = require('../services/upload')
const { imageQueries, itemQueries } = require('../queries')
const message = require('../../response-helpers/messages').MESSAGE
const responseHendler = require('../../response-helpers/error-helper')


class imageController {

     async uploadImage (req, res) {
        try {

            const id = req.params
            const auth = req.userId
            //findItem
            const findItem = await itemQueries.findByUserId(id, auth)
            if (!findItem) { return responseHendler.notFound(res, message('item').notFoundResource)}
            //deploy storage dicloudinary
            const uploadImage = await uploadFile(req, res)
        

            if(req.files === undefined) { return responseHendler.badRequest(res, message('images').incompleteKeyOrValue)}

            //use to bulk upload
            console.log('req.files:', req.files)
            let images = req.files.map((item) => {
                const image = {}
                image.item_id = findItem.id
                image.public_id = item.filename,
                image.url = item.path
                
                return image
            })

            const createImage = await imageQueries.createBulkImage(images)
            if(!createImage) { return responseHendler.badRequest(res, message('create images').invalidCreateResource)}

            return responseHendler.ok(res, message('images').created)

        }
        catch(err) {
            const key = err.message
            return responseHendler.internalError(res, message(key).errorMessage)
        }
    }

     async removeImage (req, res) {

        try {
            //find image yg akan dihapus
            const payload = req.params

            const findImage = await imageQueries.findImage(payload)
            if(!findImage) { return responseHendler.notFound(res, message('image').notFoundResource)}

            // console.log(findImage.url)
            const deleteImageCloud = await deleteImageCloudinary(findImage.public_id)
            //console.log(deleteImageCloud)

            if(deleteImageCloud.result == 'not found') {return responseHendler.badRequest(res, message('gk bisa delete di cloudinary').errorMessage)}

            const deleteImage = await imageQueries.deleteImage(findImage)
            if(!deleteImage) {return responseHendler.badRequest(res, message('image').serverError)}

            return responseHendler.ok(res, message('image delete').success)
        
            // const id = req.params.id
            // const findImage = await Image.findOne({
            //     where: {id: id}
            // })

            // if(!findImage) {
            //     throw new errorHelper(404, "No image found")
            // }
            
            //menghapus image di storage
            // fs.unlink(__basedir + `/storage/upload/${findImage.url}`, 
            //     function (err)  {
            //         if (err) {
            //             throw new errorHelper(400, 'cannot unlink')
            //         }

            //         const deleteImage = Image.destroy({
            //             where: {
            //                 id: id
            //             }
            //         })
            //         if(deleteImage === 0) {
            //             throw new errorHelper(400, 'cannot delete image')
            //         }
                    
            //         return new response(res, 200, 'delete image successfully')
            //     })
        }

        catch(err) {
            const key = err.message
            console.log(key)
            return responseHendler.internalError(res, message(key).errorMessage)
        }
   
     }
}

module.exports = {
    imageController,
}
