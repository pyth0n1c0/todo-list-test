from .app import db, ma

class Task(db.Model):
	__tablename__ = 'tasks'
	id = db.Column(db.Integer, primary_key=True)
	content = db.Column(db.String(300))
	completed = db.Column(db.Boolean)
	created_at = db.Column(db.Date)

	def __repr__(self):
		return f'<Task id={self.id} content="{self.content}" completed={self.completed}>'

class TaskSchema(ma.SQLAlchemyAutoSchema):
	class Meta:
		model = Task

task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)
