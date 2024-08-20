import { asyncHandler } from "../asyncHandler.js";

export const deleteOne = (model) => {
   return asyncHandler(async (req, res) => {
        const document = await model.findByIdAndDelete(req.params.id);
        !document && res.status(404).json({ message: "document Not Found" });
        document && res.json({ message: "success", document });
      })
}