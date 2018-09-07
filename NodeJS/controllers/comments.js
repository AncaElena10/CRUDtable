var express = require('express');
var router = express.Router();
var Blog = require('../models/comment');

router.post('/newBlog', (req, res) => {
  if (!req.body.title) {
    res.json({ success: false, message: 'Blog title is required.' });
  } else {
    if (!req.body.body) {
      res.json({ success: false, message: 'Blog body is required.' });
    } else {
      if (!req.body.createdBy) {
        res.json({ success: false, message: 'Blog creator is required.' });
      } else {
        const blog = new Blog({
          title: req.body.title,
          body: req.body.body,
          createdBy: req.body.createdBy,
        });
        blog.save((err) => {
          if (err) {
            if (err.errors) {
              if (err.errors.title) {
                res.json({ success: false, message: err.errors.title.message });
              } else {
                if (err.errors.body) {
                  res.json({ success: false, message: err.errors.body.message });
                } else {
                  res.json({ success: false, message: err });
                }
              }
            } else {
              res.json({ success: false, message: err });
            }
          } else {
            res.json({ success: true, message: 'Blog saved!' });
          }
        });
      }
    }
  }
});

router.get('/allBlogs', (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) {
      res.json({ success: false, message: err });
    } else {
      if (!blogs) {
        res.json({ success: false, message: 'No blogs found.' });
      } else {
        res.json({ success: true, blogs: blogs });
      }
    }
  }).sort({ '_id': -1 });
});

router.get('/singleBlog/:id', (req, res) => {
  if (!req.params.id) {
    res.json({ success: false, message: 'No blog ID was provided.' });
  } else {
    Blog.findOne({ _id: req.params.id }, (err, blog) => {
      if (err) {
        res.json({ success: false, message: 'Not a valid blog id' });
      } else {
        if (!blog) {
          res.json({ success: false, message: 'Blog not found.' });
        } else {
          res.json({ success: true, blog: blog });
        }
      }
    });
  }
});

router.post('/comment', (req, res) => {
  if (!req.body.comment) {
    res.json({ success: false, message: 'No comment provided' });
  } else {
    if (!req.body.id) {
      res.json({ success: false, message: 'No id was provided' });
    } else {
      Blog.findOne({ _id: req.body.id }, (err, blog) => {
        if (err) {
          res.json({ success: false, message: 'Invalid blog id' });
        } else {
          if (!blog) {
            res.json({ success: false, message: 'Blog not found.' });
          } else {
            blog.comments.push({
              comment: req.body.comment,
            });
            blog.save((err) => {
              if (err) {
                res.json({ success: false, message: 'Something went wrong.' });
              } else {
                res.json({ success: true, message: 'Comment saved' });
              }
            });
          }
        }
      });
    }
  }
});

module.exports = router;