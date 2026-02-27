from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from .models import User, Team, Activity, Leaderboard, Workout
from datetime import date


class UserModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            name='Tony Stark',
            email='ironman@marvel.com',
            password='ironman123'
        )

    def tearDown(self):
        User.objects.all().delete()

    def test_user_creation(self):
        self.assertEqual(self.user.name, 'Tony Stark')
        self.assertEqual(self.user.email, 'ironman@marvel.com')

    def test_user_str(self):
        self.assertEqual(str(self.user), 'Tony Stark')


class TeamModelTest(TestCase):
    def setUp(self):
        self.team = Team.objects.create(
            name='Team Marvel',
            members=['Tony Stark', 'Steve Rogers']
        )

    def tearDown(self):
        Team.objects.all().delete()

    def test_team_creation(self):
        self.assertEqual(self.team.name, 'Team Marvel')

    def test_team_str(self):
        self.assertEqual(str(self.team), 'Team Marvel')


class ActivityModelTest(TestCase):
    def setUp(self):
        self.activity = Activity.objects.create(
            user='Tony Stark',
            activity_type='Running',
            duration='30 mins',
            date=date(2024, 1, 15)
        )

    def tearDown(self):
        Activity.objects.all().delete()

    def test_activity_creation(self):
        self.assertEqual(self.activity.user, 'Tony Stark')
        self.assertEqual(self.activity.activity_type, 'Running')

    def test_activity_str(self):
        self.assertIn('Tony Stark', str(self.activity))


class LeaderboardModelTest(TestCase):
    def setUp(self):
        self.entry = Leaderboard.objects.create(
            user='Barry Allen',
            score=980
        )

    def tearDown(self):
        Leaderboard.objects.all().delete()

    def test_leaderboard_creation(self):
        self.assertEqual(self.entry.user, 'Barry Allen')
        self.assertEqual(self.entry.score, 980)

    def test_leaderboard_str(self):
        self.assertIn('Barry Allen', str(self.entry))


class WorkoutModelTest(TestCase):
    def setUp(self):
        self.workout = Workout.objects.create(
            name='Iron Man Circuit',
            description='High-intensity circuit training inspired by Tony Stark',
            duration='45 mins'
        )

    def tearDown(self):
        Workout.objects.all().delete()

    def test_workout_creation(self):
        self.assertEqual(self.workout.name, 'Iron Man Circuit')
        self.assertEqual(self.workout.duration, '45 mins')

    def test_workout_str(self):
        self.assertEqual(str(self.workout), 'Iron Man Circuit')


class UserAPITest(APITestCase):
    def setUp(self):
        self.user = User.objects.create(
            name='Steve Rogers',
            email='captain@marvel.com',
            password='cap123'
        )

    def tearDown(self):
        User.objects.all().delete()

    def test_get_users(self):
        url = reverse('user-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_user(self):
        url = reverse('user-list')
        data = {'name': 'Thor Odinson', 'email': 'thor@marvel.com', 'password': 'thunder123'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TeamAPITest(APITestCase):
    def setUp(self):
        self.team = Team.objects.create(
            name='Team DC',
            members=['Bruce Wayne', 'Clark Kent']
        )

    def tearDown(self):
        Team.objects.all().delete()

    def test_get_teams(self):
        url = reverse('team-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class ActivityAPITest(APITestCase):
    def setUp(self):
        self.activity = Activity.objects.create(
            user='Diana Prince',
            activity_type='Archery',
            duration='50 mins',
            date=date(2024, 1, 22)
        )

    def tearDown(self):
        Activity.objects.all().delete()

    def test_get_activities(self):
        url = reverse('activity-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class LeaderboardAPITest(APITestCase):
    def setUp(self):
        self.entry = Leaderboard.objects.create(user='Flash', score=999)

    def tearDown(self):
        Leaderboard.objects.all().delete()

    def test_get_leaderboard(self):
        url = reverse('leaderboard-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class WorkoutAPITest(APITestCase):
    def setUp(self):
        self.workout = Workout.objects.create(
            name='Dark Knight Conditioning',
            description='Batman martial arts and agility training',
            duration='90 mins'
        )

    def tearDown(self):
        Workout.objects.all().delete()

    def test_get_workouts(self):
        url = reverse('workout-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class APIRootTest(APITestCase):
    def test_api_root(self):
        response = self.client.get('/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_root_at_api_path(self):
        response = self.client.get('/api/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
