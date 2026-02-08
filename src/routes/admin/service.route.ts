import { Router, Request, Response } from "express";
import adminServiceController from "../../controller/admin/service.controller";
import { authorizedMiddleware, adminMiddleware } from "../../middleware/authorization.middleware";

const router: Router = Router();

router.post("/", authorizedMiddleware, adminMiddleware, (req: Request, res: Response) =>
  adminServiceController.create(req, res)
);

router.get("/", authorizedMiddleware, adminMiddleware, (req: Request, res: Response) =>
  adminServiceController.list(req, res)
);

router.get("/:id", authorizedMiddleware, adminMiddleware, (req: Request, res: Response) =>
  adminServiceController.getById(req, res)
);

router.put("/:id", authorizedMiddleware, adminMiddleware, (req: Request, res: Response) =>
  adminServiceController.update(req, res)
);

router.delete("/:id", authorizedMiddleware, adminMiddleware, (req: Request, res: Response) =>
  adminServiceController.remove(req, res)
);

export default router;
