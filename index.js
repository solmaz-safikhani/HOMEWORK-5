const express = require('express');
const sequelize = require('./models'); 

const app = express();
const port = process.env.PORT || 3000;



sequelize.sync({ force: false }).then(() => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
});

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./models'); 

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    }
});

module.exports = User;

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./models'); 

const Post = sequelize.define('Post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING
    },
    content: {
        type: DataTypes.TEXT
    }
});

module.exports = Post;

const User = require('./models/User');
const Post = require('./models/Post');

User.hasMany(Post, { as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId' });

app.post('/users', async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.create({ name, email });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.update(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        await user.destroy();
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/users/:userId/posts', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const post = await user.createPost(req.body);
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.get('/users/:userId/posts', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const posts = await user.getPosts();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.put('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        await post.update(req.body);
        res.json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.delete('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        await post.destroy();
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});