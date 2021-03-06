import { Transaction } from 'bsv'

import { importBoostProofFromTxHex } from '../../boost'

import { flatten } from 'lodash'

import * as models from '../../models'

import { Op } from 'sequelize'

export async function createByTxid(request, hapi) {

  // import boost work transaction if not already submitted

  return hapi.response({ }).code(200)

}

export async function index(request, hapi) {

  const where = {
  }

  if (request.query.tag) {
    where['tag'] = request.query.tag
  }

  try {

    const limit = request.query.limit || 25;

    let work = await models.BoostWork.findAll({
      where,
      order: [['createdAt', 'desc']],
      limit
    })

    return { work }

  } catch(error) {

    return hapi.response({ error: error.message }).code(500)

  }

}

export async function create(request, hapi) {

  try {

    let record = await importBoostProofFromTxHex(request.payload.transaction)

    console.log('importboostprooffromtxhex.result', record)

    return hapi.response({ work: record.toJSON() }).code(200)

  } catch(error) {

    console.error('importboostprooffromtxhex.error', error)

    return hapi.response({ error: error.message }).code(500)

  }

}

