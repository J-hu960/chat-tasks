import { HttpStatus } from '@nestjs/common';
import { DuplicateMailError } from 'src/core/domain/auth/users/excepcions/DuplicateEmailError.error';
import { BadInputForUser } from 'src/core/domain/auth/users/excepcions/InvalidUserInput.error';
import { NonExistingUserError } from 'src/core/domain/auth/users/excepcions/NonExistingUser.error';
import { InvalidMessageLength } from 'src/core/domain/calendar-bot/messages/excepcions/InvalidMessageLength.error';
import { InvalidPartyCode } from 'src/core/domain/calendar-bot/parties/exceptions/InvalidPartyCode.error';
import { InvalidPartyNameError } from 'src/core/domain/calendar-bot/parties/exceptions/InvalidPartyName.error';
import { LimititPartiesForUser } from 'src/core/domain/calendar-bot/parties/exceptions/LimitPartiesForUser.error';
import { NonExistingPartyName } from 'src/core/domain/calendar-bot/parties/exceptions/NonExistingPartyName.error';
import { RepeatedPartyname } from 'src/core/domain/calendar-bot/parties/exceptions/RepeatedPartyCode.error';
import { WrongCodeError } from 'src/core/domain/calendar-bot/parties/exceptions/WrongCode.error';
import { DeletionNotAuthorized } from 'src/core/domain/calendar-bot/tasks/excepcions/DeletionNotAuthorized';
import { NonExistingTaskError } from 'src/core/domain/calendar-bot/tasks/excepcions/NonExistingTask.error';
import { InvalidIdError } from 'src/core/domain/invalid-id.error';


export const ERROR_MAP = new Map<any, number>([
  [InvalidIdError, HttpStatus.CONFLICT],
  [InvalidMessageLength, HttpStatus.BAD_REQUEST],
  [DuplicateMailError, HttpStatus.BAD_REQUEST],
  [BadInputForUser, HttpStatus.BAD_REQUEST],
  [NonExistingUserError, HttpStatus.BAD_REQUEST],
  [DeletionNotAuthorized, HttpStatus.UNAUTHORIZED],
  [NonExistingTaskError, HttpStatus.NOT_FOUND],
  [InvalidPartyCode,HttpStatus.BAD_REQUEST],
  [InvalidPartyNameError,HttpStatus.BAD_REQUEST],
  [RepeatedPartyname,HttpStatus.CONFLICT],
  [LimititPartiesForUser,HttpStatus.FORBIDDEN],
  [WrongCodeError,HttpStatus.FORBIDDEN],
  [NonExistingPartyName,HttpStatus.BAD_REQUEST]
]);
