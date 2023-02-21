const express = require('express')
const student = require('../models/student')
const router = express.Router()
const Student = require('../models/student')

router.get('/',async(req,res) => {
    try{
        const students = await Student.find()
        res.json(students)
    }
    catch(err){
        res.send('Error'+err)
    }
})

router.get('/:id', async(req,res) => {
    try{
           const student = await Student.findById(req.params.id)
           student.id=req.body.id
           res.json(student)
    }catch(err){
        res.send('Student record not found ' + err)
    }
});

router.get('/byUid/:uid', async (req, res) => {
    try {
      const student = await Student.findOne({ uid: req.params.uid });
      res.json(student);
    } catch (err) {
      res.send('Error retrieving student: ' + err);
    }
  });



router.post('/',async(req,res) => {
    const student = new Student({
        name: req.body.name,
        uid: req.body.uid,
        branch: req.body.branch
    })

    try{
        const a1 = await student.save()
        res.json(a1)
    }
    catch(err){
        res.send('Error')
    }
})

router.patch('/:id', async (req, res) => {
    try {
      const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(student);
    } catch (err) {
      res.send('Error updating student: ' + err);
    }
  });

  router.patch('/byUid/:uid', async (req, res) => {
    try {
      const student = await Student.findOneAndUpdate({ uid: req.params.uid }, req.body, { new: true });
      res.json(student);
    } catch (err) {
      res.send('Error updating student: ' + err);
    }
  });


router.delete('/:id',async(req,res)=> {
    try{
        const student = await Student.findById(req.params.id) 
        student.id = req.body.id
        const a1 = await student.remove()
        res.json(a1)   
    }catch(err){
        res.send('Student record not found')
    }

})

module.exports = router