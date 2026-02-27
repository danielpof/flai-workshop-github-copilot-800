from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import date


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        self.stdout.write('Clearing existing data...')
        Leaderboard.objects.all().delete()
        Activity.objects.all().delete()
        Team.objects.all().delete()
        User.objects.all().delete()
        Workout.objects.all().delete()

        self.stdout.write('Creating users (superheroes)...')
        users = [
            User(name='Tony Stark', email='ironman@marvel.com', password='ironman123'),
            User(name='Steve Rogers', email='captain@marvel.com', password='cap123'),
            User(name='Thor Odinson', email='thor@marvel.com', password='thunder123'),
            User(name='Bruce Banner', email='hulk@marvel.com', password='hulk123'),
            User(name='Natasha Romanoff', email='blackwidow@marvel.com', password='widow123'),
            User(name='Bruce Wayne', email='batman@dc.com', password='batman123'),
            User(name='Clark Kent', email='superman@dc.com', password='super123'),
            User(name='Diana Prince', email='wonderwoman@dc.com', password='wonder123'),
            User(name='Barry Allen', email='flash@dc.com', password='flash123'),
            User(name='Arthur Curry', email='aquaman@dc.com', password='aqua123'),
        ]
        for user in users:
            user.save()
        self.stdout.write(self.style.SUCCESS(f'Created {len(users)} users'))

        self.stdout.write('Creating teams...')
        marvel_members = [u.name for u in User.objects.filter(email__contains='marvel.com')]
        dc_members = [u.name for u in User.objects.filter(email__contains='dc.com')]

        Team(name='Team Marvel', members=marvel_members).save()
        Team(name='Team DC', members=dc_members).save()
        self.stdout.write(self.style.SUCCESS('Created 2 teams'))

        self.stdout.write('Creating activities...')
        activities = [
            Activity(user='Tony Stark', activity_type='Running', duration='30 mins', date=date(2024, 1, 15)),
            Activity(user='Steve Rogers', activity_type='Cycling', duration='45 mins', date=date(2024, 1, 16)),
            Activity(user='Thor Odinson', activity_type='Weightlifting', duration='60 mins', date=date(2024, 1, 17)),
            Activity(user='Bruce Banner', activity_type='Yoga', duration='30 mins', date=date(2024, 1, 18)),
            Activity(user='Natasha Romanoff', activity_type='Swimming', duration='40 mins', date=date(2024, 1, 19)),
            Activity(user='Bruce Wayne', activity_type='Martial Arts', duration='90 mins', date=date(2024, 1, 20)),
            Activity(user='Clark Kent', activity_type='Running', duration='20 mins', date=date(2024, 1, 21)),
            Activity(user='Diana Prince', activity_type='Archery', duration='50 mins', date=date(2024, 1, 22)),
            Activity(user='Barry Allen', activity_type='Running', duration='10 mins', date=date(2024, 1, 23)),
            Activity(user='Arthur Curry', activity_type='Swimming', duration='60 mins', date=date(2024, 1, 24)),
        ]
        for activity in activities:
            activity.save()
        self.stdout.write(self.style.SUCCESS(f'Created {len(activities)} activities'))

        self.stdout.write('Creating leaderboard...')
        leaderboard_entries = [
            Leaderboard(user='Barry Allen', score=980),
            Leaderboard(user='Thor Odinson', score=950),
            Leaderboard(user='Steve Rogers', score=920),
            Leaderboard(user='Diana Prince', score=900),
            Leaderboard(user='Tony Stark', score=880),
            Leaderboard(user='Bruce Wayne', score=870),
            Leaderboard(user='Arthur Curry', score=850),
            Leaderboard(user='Natasha Romanoff', score=830),
            Leaderboard(user='Clark Kent', score=810),
            Leaderboard(user='Bruce Banner', score=790),
        ]
        for entry in leaderboard_entries:
            entry.save()
        self.stdout.write(self.style.SUCCESS(f'Created {len(leaderboard_entries)} leaderboard entries'))

        self.stdout.write('Creating workouts...')
        workouts = [
            Workout(name='Iron Man Circuit', description='High-intensity circuit training inspired by Tony Stark', duration='45 mins'),
            Workout(name='Super Soldier Training', description='Steve Rogers full-body workout for peak performance', duration='60 mins'),
            Workout(name='Thunder God Strength', description='Thor-inspired heavy lifting and endurance training', duration='75 mins'),
            Workout(name='Dark Knight Conditioning', description='Batman martial arts and agility training', duration='90 mins'),
            Workout(name='Speed Force Sprint', description='Flash-inspired interval sprinting and cardio', duration='30 mins'),
        ]
        for workout in workouts:
            workout.save()
        self.stdout.write(self.style.SUCCESS(f'Created {len(workouts)} workouts'))

        self.stdout.write(self.style.SUCCESS('Database populated successfully!'))
