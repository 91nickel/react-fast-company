const {Schema, model} = require('mongoose')

const schema = new Schema(
    {
        content: {type: String, required: true},
        // на чьей странице коммент
        pageId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        // автор коммента
        userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    },
    {
        timestamps: {createdAt: 'created_at'},
    }
)

module.exports = model('Comment', schema)