from django.core.management import BaseCommand
from users.models import Department, Team


class Command(BaseCommand):
	def handle(self, *args, **options):
		contents_teams = ["COLO", "COMT", "COPH", "COCH", "COBS", "COGS"]
		design_teams = ["DEH", "DE1", "DE2", "DE3"]
		management_teams = ['MNH', 'MNG', 'MNA', 'MNR']
		legal_teams = ['LGH']
		technology_teams = ['TNH']
		marketing_teams = ['MKH']
		departments = [
			('CO', contents_teams),
			('DE', design_teams),
			('MN', management_teams),
			('LG', legal_teams),
			('TN', technology_teams),
			('MK', marketing_teams),
		]
		for department in departments:
			department_name, teams = department
			department_obj, created = Department.objects.get_or_create(name=department_name)
			if created:
				print(f'{department_obj} has been created')
			else:
				print(f'{department_obj} has been already exist')

			for team in teams:
				team = Team.objects.get_or_create(
					department=department_obj,
					name=team
				)
				if team[1]:
					print(f'{team[0]} team has been created')
				else:
					print(f'{team[0]} has been already exist')

		self.stdout.write(self.style.SUCCESS("Successfully initialize departments and team"))
