import {Router} from "express"
import { fetchQuestion, newQuestion, updateQuestion } from "../controllers/choice.js"

const router=Router()

router.route("/").post(newQuestion).get(fetchQuestion)
router.route("/:id").post(updateQuestion)



export default router