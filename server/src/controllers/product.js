import { Product } from "../db/schema/Product";
// import { Category } from "../db/schema/Category";

export const getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.find({}).populate("category");
    return res.status(200).json({
      message: "Products Fetched Successfully",
      data: products,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: "Error in Fetching Products",
      data: null,
    });
  }
};

export const getProductByCategory = async (req, res, next) => {
  try {
    const categoryID = await req.params.id;
    const products = await Product.find({ category: categoryID }).populate(
      "category"
    );
    return res.status(200).json({
      message: "Products Fetched Successfully",
      data: products,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: "Error in Fetching Products",
      data: null,
    });
  }
};

export const createProduct = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.error(errors);
      return res.status(400).json({
        message: errors.array(),
        success: false,
      });
    }
    const file = req.file;

    const uploadIoResponse = await axios.post(
      // `https://api.upload.io/v2/accounts/${process.env.UPLOAD_IO_ACCOUNT_ID}/uploads/binary`,
      file.buffer,
      {
        headers: {
          Authorization: `Bearer ${process.env.UPLOAD_IO_API_KEY}`,
        },
      }
    );
    // const { fileUrl } = uploadIoResponse.data;
    const { title, description } = req.body;
    const product = await Product.create({
      title,
      description,
      image: fileUrl,
      user: req.user.id,
    });

    return res.status(200).json({
      message: "Product created successfully",
      success: true,
      data: post,
    });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
