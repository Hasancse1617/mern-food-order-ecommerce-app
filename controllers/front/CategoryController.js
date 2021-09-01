const Category = require('../../models/Category');

module.exports.allCategory = async(req, res) =>{
    try {
        // const response = await Category.find().sort({updatedAt:'descending'});
        const response = await Category.aggregate([{
                $lookup:{
                    from: "products",
                    as: "products",
                    let: {categoryId: "$_id"},
                    pipeline:[
                        {
                            $match:{
                                $expr:{$and: [
                                    {$eq: ["$category_id", "$$categoryId"]}
                                ]}
                            }
                        }
                    ]
                }
            }
        ]);
        // console.log(response);
        return res.status(200).json({response});
    } catch (error) {
        return res.status(500).json({errors: error, msg: error.message});
    }
}