import SupporterController from './SupporterController'
import ProjectController from './ProjectController'
import MessageController from './MessageController'
import UserChatController from './UserChatController'
import TechStackController from './TechStackController'
import HeroProfileController from './HeroProfileController'
import AboutProfileController from './AboutProfileController'
import ContactController from './ContactController'
import VisitorController from './VisitorController'
import GuestbookController from './GuestbookController'
import ChatbotController from './ChatbotController'
import UserController from './UserController'
import ColorPaletteController from './ColorPaletteController'
import UserProfileController from './UserProfileController'
import Settings from './Settings'
const Controllers = {
    SupporterController: Object.assign(SupporterController, SupporterController),
ProjectController: Object.assign(ProjectController, ProjectController),
MessageController: Object.assign(MessageController, MessageController),
UserChatController: Object.assign(UserChatController, UserChatController),
TechStackController: Object.assign(TechStackController, TechStackController),
HeroProfileController: Object.assign(HeroProfileController, HeroProfileController),
AboutProfileController: Object.assign(AboutProfileController, AboutProfileController),
ContactController: Object.assign(ContactController, ContactController),
VisitorController: Object.assign(VisitorController, VisitorController),
GuestbookController: Object.assign(GuestbookController, GuestbookController),
ChatbotController: Object.assign(ChatbotController, ChatbotController),
UserController: Object.assign(UserController, UserController),
ColorPaletteController: Object.assign(ColorPaletteController, ColorPaletteController),
UserProfileController: Object.assign(UserProfileController, UserProfileController),
Settings: Object.assign(Settings, Settings),
}

export default Controllers