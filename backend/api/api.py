from datetime import date
from flask import Blueprint, jsonify, request
from ..models import Task, task_schema, tasks_schema
from ..app import db
from .utils import *

api = Blueprint('api', __name__)

@api.route('/tasks/type', methods=['POST'])
def get_tasks():
	if request.json:
		try:
			completed = request.json['completed']
		except:
			return jsonify({'error': 'requisição inválida'}), 400

		response = tasks_schema.dump(Task.query.filter_by(completed=completed).all())
		if response:
			for task in response:
				task['created_at'] = format_date(task['created_at'])
			return jsonify(response), 200

		return jsonify({'msg': 'sem tarefas'}), 200

	return jsonify({'error': 'requisição inválida'}), 400

@api.route('/tasks/all', methods=['GET'])
def get_all_tasks():
	response = tasks_schema.dump(Task.query.all())
	if response:
		for task in response:
			task['created_at'] = format_date(task['created_at'])
		return jsonify(response), 200

	return jsonify({'msg': 'sem tarefas'}), 200

@api.route('/tasks', methods=['POST'])
def post_task():
	try:
		content = request.json['content']
	except:
		return jsonify({'error': 'requisição inválida'}), 400

	new_task = Task(
		content=content,
		completed=False,
		created_at=date.today()
	)
	db.session.add(new_task)
	db.session.commit()

	response = task_schema.dump(Task.query.order_by(Task.id.desc()).first())
	response['created_at'] = format_date(response['created_at'])
	return jsonify(response), 201

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
