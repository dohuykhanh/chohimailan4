const express = require('express');
const GroupRouter = express.Router();
const { ObjectId } = require('mongodb');
const { db } = require('../db')
    // here we create our Route
GroupRouter.post("/", async(req, res) => {
        const group = {
            name: req.body.name,
            listUserId: req.body.listUserId,
            admindUserId: req.body.admindUserId
        };
        const result = await db.Group.insertOne(group);

        if (!result) {
            res.json({
                status: "FAILED",
                message: "Không thêm được sản phẩm"
            })
        } else {
            res.json({
                status: "SUCCESS",
                message: "Thêm sản phẩm thành công",
                data: group
            })
        }
    })
    // get the


// GroupRouter.get("/c/:chinhanh", async(req, res) => {
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


GroupRouter.get("/", async(req, res) => {

    const result = await db.Group.find({

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
GroupRouter.get("/:id", async(req, res) => {
    const id = req.params.id;
    const result = await db.Group.find({
        
admindUserId: id,
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
GroupRouter.put("/:id", async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const filter = {
        _id: new ObjectId(id)
    }
    const updateDoc = {
        $set: {
            TenVatTu: req.body.TenVatTu,
            SoLuong: parseInt(req.body.SoLuong),
            NgaySanXuat: new Date(req.body.NgaySanXuat),
            NgayHetHan: new Date(req.body.NgayHetHan),
            ChiNhanh: req.body.ChiNhanh,
            Gia: parseInt(req.body.Gia)
        }
    }
    const result = await db.VatTu.updateOne(filter, updateDoc);

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

GroupRouter.delete("/:id", async(req, res) => {
    const id = req.params.id;
    const body = req.body;
    const filter = {
        _id: new ObjectId(id)
    }
    const updateDoc = {
        $set: body
    }
    const result = await db.VatTu.deleteOne(filter);

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

module.exports = GroupRouter;