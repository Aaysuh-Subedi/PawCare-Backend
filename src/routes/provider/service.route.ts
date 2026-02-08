import { Router, Request, Response } from "express";
import providerServiceController from "../../controller/provider/service.controller";
import { authorizedMiddleware } from "../../middleware/authorization.middleware";

const router: Router = Router();

router.post("/", authorizedMiddleware, (req: Request, res: Response) =>
  providerServiceController.create(req, res)
);

router.put("/:id", authorizedMiddleware, (req: Request, res: Response) =>
  providerServiceController.update(req, res)
);

router.delete("/:id", authorizedMiddleware, (req: Request, res: Response) =>
  providerServiceController.remove(req, res)
);

export default router;
