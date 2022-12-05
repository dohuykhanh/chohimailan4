const express = require('express');
const TaskRouter = express.Router();
const { ObjectId } = require('mongodb');
const { db } = require('../db')
    // here we create our Route
TaskRouter.post("/", async(req, res) => {
        const Task = {
            name: req.body.name,
            listUserId: req.body.listUserId,
            admindUserId: req.body.admindUserId
        };
        const result = await db.Task.insertOne(Task);

        if (!result) {
            res.json({
                status: "FAILED",
                message: "Không thêm được sản phẩm"
            })
        } else {
            res.json({
                status: "SUCCESS",
                message: "Thêm sản phẩm thành công",
                data: Task
            })
        }
    })
    // get the


// TaskRouter.get("/c/:chinhanh", async(req, res) => {
//     const chinhanh = req.params.chinhanh;
//     const result = await db.VatTu.find({
//         ChiNhanh: chinhanh,
//     }).toArray();

//     if (!result) {
//         res.json({
//             status: "FAILED",
//             message: "Không có dữ liệu"
//         })
//     } else {
//         res.json({
//             status: "SUCCESS",
//             message: "Lấy được dữ liệu",
//             data: result
//         })
//     }
// })

//trng impoertan
TaskRouter.get("/c/:userId", async(req, res) => {
    const idofuser = req.params.userId;
    const level = "important";
    const result = await db.Task.find({
        userId: idofuser,
        level: level
    }).toArray();

    if (!result) {
        res.json({
            status: "FAILED",
            message: "Không có dữ liệu"
        })
    } else {
        res.json({
            status: "SUCCESS",
            message: "Lấy được dữ liệu",
            data: result
        })
    }
})

//get the
TaskRouter.get("/:id", async(req, res) => {
    const id = req.params.id;
    const result = await db.Task.find({


        userId: id,
    }).toArray();

    if (!result) {
        res.json({
            status: "FAILED",
            message: "Không có dữ liệu"
        })
    } else {
        res.json({
            status: "SUCCESS",
            message: "Lấy được dữ liệu",
            data: result
        })
    }
})

//get the
TaskRouter.put("/:id", async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const filter = {
        _id: new ObjectId(id)
    }
    const updateDoc = {
        $set: {
            complete: req.body.complete,
            level: req.body.level,
            enddate: new Date(req.body.enddate),
            description: req.body.description,
            title: req.body.title
        }
    }
    const result = await db.Task.updateOne(filter, updateDoc);

    if (!result) {
        res.json({
            status: "FAILED",
            message: "Không có dữ liệu"
        })
    } else {
        res.json({
            status: "SUCCESS",
            message: "Lấy được dữ liệu",
            data: result
        })
    }
})

TaskRouter.delete("/:id", async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const filter = {
        _id: new ObjectId(id)
    }
    const updateDoc = {
        $set: body
    }
    const result = await db.Task.deleteOne(filter);

    if (!result) {
        res.json({
            status: "FAILED",
            message: "Không có dữ liệu"
        })
    } else {
        res.json({
            status: "SUCCESS",
            message: "Lấy được dữ liệu",
            data: result
        })
    }
})

module.exports = TaskRouter;