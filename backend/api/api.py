from datetime import date
from flask import Blueprint, jsonify, request
from ..models import Task, task_schema, tasks_schema
from ..app import db

api = Blueprint('api', __name__)

@api.route('/tasks', methods=['GET'])
def get_tasks():
	if request.json:
		try:
			completed = request.json['completed']
		except:
			return jsonify({'error': 'requisição inválida'}), 400

		response = tasks_schema.dump(Task.query.filter_by(completed=completed).all())
		if response:
			return jsonify(response), 200

		return jsonify({'msg': 'sem tarefas'}), 404

	response = tasks_schema.dump(Task.query.all())
	if response:
		return jsonify(response), 200

	return jsonify({'msg': 'sem tarefas'}), 404

@api.route('/tasks', methods=['POST'])
def post_task():
	try:
		content = request.json['content']
	except:
		return jsonify({'error': 'requisição inválida'}), 400

	task = Task(
		content=content,
		completed=False,
		created_at=date.today()
	)
	db.session.add(task)
	db.session.commit()

	return jsonify({'msg': 'tarefa adicionada'}), 200

@api.route('/tasks/<int:id>', methods=['PUT'])
def put_task(id):
	task = Task.query.filter_by(id=id).first()
	if task:
		try:
			task.content = request.json['new_content']
		except:
			return jsonify({'error': 'requisição inválida'}), 400

		db.session.commit()
		return jsonify({'msg': 'tarefa atualizada'}), 200

	return jsonify({'error': 'tarefa não encontrada'}), 404

@api.route('/tasks/<int:id>', methods=['DELETE'])
def delete_task(id):
	task = Task.query.filter_by(id=id).first()
	if task:
		db.session.delete(task)
		db.session.commit()
		return jsonify({'msg': 'tarefa deletada'}), 200

	return jsonify({'error': 'tarefa não encontrada'}), 404

@api.route('/tasks/<int:id>/toggle_status', methods=['PUT'])
def toggle_status_task(id):
	task = Task.query.filter_by(id=id).first()
	if task:
		task.completed = not task.completed
		db.session.commit()
		return jsonify({'msg': 'estado atualizado'}), 200

	return jsonify({'error': 'tarefa não encontrada'}), 404


def configure(app):
	app.register_blueprint(api)
