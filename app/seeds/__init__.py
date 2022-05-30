from flask.cli import AppGroup
from .users import seed_users, undo_users
from .estate_types import seed_estate_types, undo_estate_types
from .estate import seed_estates, undo_estates
from .critiques import seed_critiques, undo_critiques
from .estate_images import seed_estate_images, undo_estate_images

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    # Add other seed functions here
    seed_estate_types()
    seed_estates()
    seed_critiques()
    seed_estate_images()
    


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_estates()
    undo_estate_types()
    undo_critiques()
    undo_estate_images()
