const Course = require('../models/course');
const { GradeSubject } = require('../models/gradeSubject');
// @desc    Create a new course
// @route   POST /api/courses
console.log(GradeSubject)
exports.createCourse = async (req, res) => {
  try {
    
    const { grade,subjectId,chapter,description,status,tenantId, title,uploadType } = req.body;
     // Validate required fields
     if (!subjectId || !chapter || !tenantId || !title || !uploadType) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    console.log(subjectId,'maybe')
   
    const gradefound = await GradeSubject.findById(subjectId);
   
    if (!gradefound) {
      return res.status(404).json({ error: "Grade not found for the given subjectId", grade});
    }
    const grade1 = gradefound.grade; // Ensure `grade` exists

    // Include grade in the course object
    const course = new Course({
      subjectId,
      chapter,
      description,
      status,
      tenantId,
      title,
      uploadType,
      grade : grade1 // Assuming `grade` is the field you need
    });
    
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Get all courses
// @route   GET /api/courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({statusCode:200 ,body:courses});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get a single course by ID
// @route   GET /api/courses/:id
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('subject');
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
exports.updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json({ message: "Course deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
