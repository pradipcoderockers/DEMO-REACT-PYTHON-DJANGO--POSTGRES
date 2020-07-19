from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db.models.signals import post_save
from django.dispatch import receiver

# Create your models here.
class UserManager(BaseUserManager):

    use_in_migrations = True

    def create_user(self, email, password=None):
        user = self.model(
            email=self.normalize_email(email),
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        user = self.create_user(
            email,
            password=password
        )
        user.is_staff  = True
        user.is_active  = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractUser):
    fullname = models.CharField(
        null=True,
        blank=True,
        max_length=512,
        help_text='Your fullname like first and last name, 512 characters.'
    )
    email = models.EmailField(max_length=254, unique=True)
    is_staff = models.BooleanField(
        default=False,
        help_text='Designates whether the user can log into this admin site.',
    )
    is_active = models.BooleanField(
        default=True,
        help_text=(
            'Designates whether this user should be treated as active. '
            'Deselect this instead of deleting accounts.'
        ),
    )
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = UserManager()

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'
        ordering = ['id']
    
    def get_fullname(self):
        return self.fullname

    def __str__(self):
        return "{} ({})".format(self.get_fullname(), self.email)

    
class UserProfile(models.Model):
    RETAILER = 1
    DISTRIBUTOR = 2
    USER = 3
    ROLE_CHOICES = (
        (RETAILER, 'Retailer'),
        (DISTRIBUTOR, 'Distributor'),
        (USER, 'General User'),
    )
    user = models.OneToOneField(User, related_name='profile', unique=True, on_delete=models.CASCADE)
    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, null=True, blank=True)
    contact_number = models.CharField(max_length=255, blank=True, null=True)
    pincode = models.CharField(max_length=255, blank=True, null=True)
    country = models.CharField(max_length=255, blank=True, null=True)
    state = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    address1 = models.CharField(max_length=255, blank=True, null=True)
    address2 = models.CharField(max_length=255, blank=True, null=True)
    sales_channel = models.CharField(max_length=255, blank=True, null=True)
    shipping_ou = models.CharField(max_length=255, blank=True, null=True)
    photo_url = models.CharField(max_length=255, blank=True, null=True)
    def __str__(self):
        return "[{}] {}".format(self.user.email, self.user.get_fullname())

    @receiver(post_save, sender=User)
    def create_or_update_user_profile(sender, instance, created, **kwargs):
        """
        Signal handler to create user profiles automatically
        """
        if created:
            UserProfile.objects.create(user=instance)
        instance.profile.save()
